import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { volunteerSignup } from '$lib/server/db/schema';
import { notify } from '$lib/server/notify';
import { volunteerRoles } from '$lib/data/volunteer';
import { volunteerFromFormData, validateVolunteer } from '$lib/forms/validation';
import { looksAutomated, silentSuccess, invalid } from '$lib/server/forms';

const roleNames = new Map(volunteerRoles.map((role) => [role.id, role.name]));

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		if (looksAutomated(data)) return silentSuccess();

		const values = volunteerFromFormData(data);
		const errors = validateVolunteer(values);

		if (Object.keys(errors).length > 0) return invalid(errors, values);

		const { name, email, phone, church, notes, roles } = values;

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
