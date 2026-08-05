import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { volunteerSignup } from '$lib/server/db/schema';
import { notify } from '$lib/server/notify';
import { volunteerRoles } from '$lib/data/volunteer';
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

const roleIds = new Set(volunteerRoles.map((role) => role.id));
const roleNames = new Map(volunteerRoles.map((role) => [role.id, role.name]));

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		if (looksAutomated(data)) return silentSuccess();

		const name = cleanText(data.get('name'), 120);
		const email = cleanText(data.get('email'), 254);
		const phone = cleanText(data.get('phone'), 40);
		const church = cleanText(data.get('church'), 160);
		const notes = cleanMultiline(data.get('notes'), 2000);

		// Only keep ids we actually publish, so a tampered form can't write junk.
		const roles = data
			.getAll('roles')
			.map((role) => String(role))
			.filter((role) => roleIds.has(role));

		const values = { name, email, phone, church, notes, roles };
		const errors: FieldErrors = {};

		if (!name) errors.name = 'Please tell us your name.';
		if (!email) errors.email = 'We need an email address so we can follow up.';
		else if (!isEmail(email)) errors.email = 'That email address doesn’t look quite right.';
		if (phone && !isPhone(phone)) errors.phone = 'That phone number doesn’t look quite right.';
		if (roles.length === 0) errors.roles = 'Pick at least one — “wherever I’m needed” counts!';

		if (Object.keys(errors).length > 0) return invalid(errors, values);

		try {
			await db.insert(volunteerSignup).values({
				name,
				email,
				phone: phone || null,
				church: church || null,
				roles,
				notes: notes || null
			});
		} catch (error) {
			console.error('[volunteer] insert failed', error);
			return invalid(
				{
					form: 'Something went wrong on our end and your sign-up didn’t save. Please try again in a moment.'
				},
				values
			);
		}

		await notify({
			subject: `New volunteer: ${name}`,
			replyTo: email,
			lines: [
				['Name', name],
				['Email', email],
				['Phone', phone || '—'],
				['Church', church || '—'],
				['Roles', roles.map((role) => roleNames.get(role) ?? role).join(', ')],
				['Notes', notes || '—']
			]
		});

		return { success: true as const, name };
	}
};
