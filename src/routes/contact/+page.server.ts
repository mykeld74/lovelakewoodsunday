import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { contactMessage } from '$lib/server/db/schema';
import { notify } from '$lib/server/notify';
import { contactFromFormData, validateContact } from '$lib/forms/validation';
import { looksAutomated, silentSuccess, invalid } from '$lib/server/forms';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		if (looksAutomated(data)) return silentSuccess();

		const values = contactFromFormData(data);
		const errors = validateContact(values);

		if (Object.keys(errors).length > 0) return invalid(errors, values);

		const { name, email, phone, message } = values;

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
