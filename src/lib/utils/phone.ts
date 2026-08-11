/** Strip to digits, capped at 10 for US-style numbers. */
export function phoneDigits(value: string): string {
	return value.replace(/\D/g, '').slice(0, 10);
}

/** Format as (xxx) xxx-xxxx while typing. */
export function formatPhoneInput(value: string): string {
	const digits = phoneDigits(value);
	if (digits.length === 0) return '';
	if (digits.length <= 3) return `(${digits}`;
	if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
	return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
