import { fail } from '@sveltejs/kit';

export type FieldErrors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function cleanText(value: FormDataEntryValue | null, max = 500): string {
	if (typeof value !== 'string') return '';
	return value.trim().replace(/\s+/g, ' ').slice(0, max);
}

export function cleanMultiline(value: FormDataEntryValue | null, max = 4000): string {
	if (typeof value !== 'string') return '';
	return value.trim().replace(/\r\n/g, '\n').slice(0, max);
}

export function isEmail(value: string): boolean {
	return EMAIL.test(value) && value.length <= 254;
}

/**
 * Phone numbers are collected as free text on purpose — people write them a
 * dozen different ways and rejecting a valid number is worse than storing a
 * messy one. We only check that it plausibly contains a number.
 */
export function isPhone(value: string): boolean {
	const digits = value.replace(/\D/g, '');
	return digits.length >= 7 && digits.length <= 15;
}

/**
 * Two quiet spam checks that cost real visitors nothing:
 *  - a honeypot field that is invisible to people but tempting to bots
 *  - a timestamp, because bots fill and submit forms faster than anyone reads
 */
export function looksAutomated(data: FormData): boolean {
	if (cleanText(data.get('website'))) return true;

	const started = Number(data.get('started_at'));
	if (Number.isFinite(started) && started > 0) {
		const elapsed = Date.now() - started;
		if (elapsed < 2500) return true;
		// A form open for over 12 hours is a stale/replayed page.
		if (elapsed > 12 * 60 * 60 * 1000) return true;
	}

	return false;
}

/**
 * Returned when the honeypot trips. It looks exactly like success so a bot
 * gets no signal about what gave it away, and a real person who somehow hits
 * it is not left staring at an error.
 */
export function silentSuccess() {
	return { success: true as const };
}

/**
 * Generic over `values` so each action's re-populated fields keep their real
 * shape in `ActionData` — the volunteer form's `roles: string[]` survives the
 * round trip instead of widening to `unknown`.
 */
export function invalid<T extends Record<string, unknown>>(errors: FieldErrors, values: T) {
	return fail(400, { errors, values, success: false as const });
}
