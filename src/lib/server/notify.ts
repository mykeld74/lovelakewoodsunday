import { env } from '$env/dynamic/private';
import { site } from '$lib/config/site';

/**
 * Every submission is stored in Postgres, so nothing is ever lost. This module
 * is the inbox nudge on top of that: with a Resend API key configured, new
 * volunteers and questions are emailed out as well.
 *
 * Env:
 *   RESEND_API_KEY     — required to send
 *   RESEND_FROM_EMAIL  — verified sender, e.g. `Love Lakewood Sunday <noreply@…>`
 *   NOTIFY_EMAIL       — comma-separated recipients (defaults to site.contactEmail)
 */
export type Notification = {
	subject: string;
	lines: [label: string, value: string][];
	replyTo?: string;
};

export async function notify({ subject, lines, replyTo }: Notification): Promise<void> {
	const apiKey = env.RESEND_API_KEY?.trim();
	const from = env.RESEND_FROM_EMAIL?.trim() || env.NOTIFY_FROM?.trim();
	const to = (env.NOTIFY_EMAIL?.trim() || site.contactEmail)
		.split(',')
		.map((address) => address.trim())
		.filter(Boolean);

	if (!apiKey || !from || to.length === 0) {
		console.info(
			`[notify] skipped (missing ${[!apiKey && 'RESEND_API_KEY', !from && 'RESEND_FROM_EMAIL', !to.length && 'NOTIFY_EMAIL'].filter(Boolean).join(', ')}):`,
			subject,
			Object.fromEntries(lines)
		);
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
				to,
				subject,
				text,
				html,
				...(replyTo ? { reply_to: replyTo } : {})
			})
		});

		if (!response.ok) {
			console.error('[notify] Resend failed', response.status, await response.text());
			return;
		}

		const result = (await response.json()) as { id?: string };
		console.info('[notify] sent', result.id ?? subject);
	} catch (error) {
		// A failed notification must never fail the submission — the row is
		// already safely in the database.
		console.error('[notify] Resend threw', error);
	}
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
