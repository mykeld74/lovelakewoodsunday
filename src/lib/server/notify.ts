import { env } from '$env/dynamic/private';

/**
 * Every submission is stored in Postgres, so nothing is ever lost. This module
 * is the optional nudge on top of that: if the team sets NOTIFY_EMAIL and a
 * RESEND_API_KEY, new volunteers and questions land in an inbox too.
 *
 * With neither set it logs and moves on, so local development and a fresh
 * deploy both work without any extra configuration.
 */
export type Notification = {
	subject: string;
	lines: [label: string, value: string][];
	replyTo?: string;
};

export async function notify({ subject, lines, replyTo }: Notification): Promise<void> {
	const to = env.NOTIFY_EMAIL;
	const apiKey = env.RESEND_API_KEY;
	const from = env.NOTIFY_FROM ?? 'Love Lakewood Sunday <onboarding@resend.dev>';

	if (!to || !apiKey) {
		console.info(`[notify] ${subject}`, Object.fromEntries(lines));
		return;
	}

	const text = lines.map(([label, value]) => `${label}: ${value}`).join('\n');
	const html = `<table style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">${lines
		.map(
			([label, value]) =>
				`<tr><td style="padding:6px 16px 6px 0;color:#5c6e77;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0"><strong>${escapeHtml(value).replace(/\n/g, '<br>')}</strong></td></tr>`
		)
		.join('')}</table>`;

	try {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from,
				to: to.split(',').map((address) => address.trim()),
				subject,
				text,
				html,
				...(replyTo ? { reply_to: replyTo } : {})
			})
		});

		if (!response.ok) {
			console.error('[notify] email failed', response.status, await response.text());
		}
	} catch (error) {
		// A failed notification must never fail the submission — the row is
		// already safely in the database.
		console.error('[notify] email threw', error);
	}
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
