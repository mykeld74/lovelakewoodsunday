import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

/**
 * Every page on this site is public, so the session lookup is skipped unless
 * a better-auth cookie is actually present. Without this guard every visitor
 * would cost a database round-trip before the page could render.
 */
const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const hasAuthCookie = event.request.headers.get('cookie')?.includes('better-auth');

	if (hasAuthCookie) {
		const session = await auth.api.getSession({ headers: event.request.headers });

		if (session) {
			event.locals.session = session.session;
			event.locals.user = session.user;
		}
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

const securityHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	// Nothing on this site needs these, and denying them is one less thing to
	// worry about if a third-party embed is ever added.
	response.headers.set(
		'Permissions-Policy',
		'geolocation=(), microphone=(), camera=(), payment=(), interest-cohort=()'
	);

	return response;
};

export const handle: Handle = sequence(securityHeaders, handleBetterAuth);
