import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { contactMessage } from '$lib/server/db/schema';
import { notify } from '$lib/server/notify';
import {
	cleanText,
	cleanMultiline,
	isEmail,
	isPhone,
	looksAutomated,
	silentSuccess,
	invalid,
	type FieldErrors
} from '$lib/server/forms';

export const actions: Actions = {
	contact: async ({ request }) => {
		const data = await request.formData();

		if (looksAutomated(data)) return silentSuccess();

		const name = cleanText(data.get('name'), 120);
		const email = cleanText(data.get('email'), 254);
		const phone = cleanText(data.get('phone'), 40);
		const message = cleanMultiline(data.get('message'), 4000);

		const values = { name, email, phone, message };
		const errors: FieldErrors = {};

		if (!name) errors.name = 'Please tell us your name.';
		if (!email) errors.email = 'We need an email address to reply to you.';
		else if (!isEmail(email)) errors.email = 'That email address doesn’t look quite right.';
		if (phone && !isPhone(phone)) errors.phone = 'That phone number doesn’t look quite right.';
		if (!message) errors.message = 'Let us know what you’d like to ask.';
		else if (message.length < 5) errors.message = 'Could you add a little more detail?';

		if (Object.keys(errors).length > 0) return invalid(errors, values);

		try {
			await db.insert(contactMessage).values({
				name,
				email,
				phone: phone || null,
				message
			});
		} catch (error) {
			console.error('[contact] insert failed', error);
			return invalid(
				{
					form: 'Something went wrong on our end and your message didn’t send. Please try again, or email us directly.'
				},
				values
			);
		}

		await notify({
			subject: `New question from ${name}`,
			replyTo: email,
			lines: [
				['Name', name],
				['Email', email],
				['Phone', phone || '—'],
				['Message', message]
			]
		});

		return { success: true as const };
	}
};
