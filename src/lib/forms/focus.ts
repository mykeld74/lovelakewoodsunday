import type { FieldErrors } from './validation';

const ORDER = ['roles', 'name', 'email', 'phone', 'message', 'church', 'notes', 'form'];

export function focusFirstError(errors: FieldErrors, ids: Record<string, string>) {
	const field = ORDER.find((key) => errors[key]);
	if (!field) return;

	if (field === 'roles') {
		document.querySelector<HTMLElement>('input[name="roles"]')?.focus();
		return;
	}

	const id = ids[field];
	if (id) document.getElementById(id)?.focus();
}
