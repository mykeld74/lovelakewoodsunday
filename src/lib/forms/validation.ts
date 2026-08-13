import { volunteerRoles } from '$lib/data/volunteer';

export type FieldErrors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const roleIds = new Set(volunteerRoles.map((role) => role.id));

export function cleanText(
	value: FormDataEntryValue | string | null | undefined,
	max = 500
): string {
	if (typeof value !== 'string') return '';
	return value.trim().replace(/\s+/g, ' ').slice(0, max);
}

export function cleanMultiline(
	value: FormDataEntryValue | string | null | undefined,
	max = 4000
): string {
	if (typeof value !== 'string') return '';
	return value.trim().replace(/\r\n/g, '\n').slice(0, max);
}

export function isEmail(value: string): boolean {
	return EMAIL.test(value) && value.length <= 254;
}

export function isPhone(value: string): boolean {
	const digits = value.replace(/\D/g, '');
	return digits.length >= 7 && digits.length <= 15;
}

export type ContactValues = {
	name: string;
	email: string;
	phone: string;
	message: string;
};

export function contactFromFormData(data: FormData): ContactValues {
	return {
		name: cleanText(data.get('name'), 120),
		email: cleanText(data.get('email'), 254),
		phone: cleanText(data.get('phone'), 40),
		message: cleanMultiline(data.get('message'), 4000)
	};
}

export function validateContact(values: ContactValues): FieldErrors {
	const errors: FieldErrors = {};

	if (!values.name) errors.name = 'Please tell us your name.';
	if (!values.email) errors.email = 'We need an email address to reply to you.';
	else if (!isEmail(values.email)) errors.email = 'That email address doesn’t look quite right.';
	if (values.phone && !isPhone(values.phone)) {
		errors.phone = 'That phone number doesn’t look quite right.';
	}
	if (!values.message) errors.message = 'Let us know what you’d like to ask.';
	else if (values.message.length < 5) errors.message = 'Could you add a little more detail?';

	return errors;
}

export type VolunteerValues = {
	name: string;
	email: string;
	phone: string;
	church: string;
	notes: string;
	roles: string[];
};

export function volunteerFromFormData(data: FormData): VolunteerValues {
	return {
		name: cleanText(data.get('name'), 120),
		email: cleanText(data.get('email'), 254),
		phone: cleanText(data.get('phone'), 40),
		church: cleanText(data.get('church'), 160),
		notes: cleanMultiline(data.get('notes'), 2000),
		roles: data
			.getAll('roles')
			.map((role) => String(role))
			.filter((role) => roleIds.has(role))
	};
}

export function validateVolunteer(values: VolunteerValues): FieldErrors {
	const errors: FieldErrors = {};

	if (!values.name) errors.name = 'Please tell us your name.';
	if (!values.email) errors.email = 'We need an email address so we can follow up.';
	else if (!isEmail(values.email)) errors.email = 'That email address doesn’t look quite right.';
	if (values.phone && !isPhone(values.phone)) {
		errors.phone = 'That phone number doesn’t look quite right.';
	}
	if (values.roles.length === 0) {
		errors.roles = 'Pick at least one — “wherever I’m needed” counts!';
	}

	return errors;
}
