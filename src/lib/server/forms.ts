import { fail } from '@sveltejs/kit';
export {
	cleanText,
	cleanMultiline,
	isEmail,
	isPhone,
	type FieldErrors
} from '$lib/forms/validation';

/**
 * Two quiet spam checks that cost real visitors nothing:
 *  - a honeypot field that is invisible to people but tempting to bots
 *  - a timestamp, because bots fill and submit forms faster than anyone reads
 */
export function looksAutomated(data: FormData): boolean {
	const website = data.get('website');
	if (typeof website === 'string' && website.trim()) return true;

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
export function invalid<T extends Record<string, unknown>>(
	errors: import('$lib/forms/validation').FieldErrors,
	values: T
) {
	return fail(400, { errors, values, success: false as const });
}
