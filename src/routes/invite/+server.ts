import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Short link for print, pulpit announcements, and QR codes:
 * lovelakewoodsunday.org/invite → the home page.
 */
export const GET: RequestHandler = ({ url }) => {
	const source = (url.searchParams.get('source') ?? 'invite')
		.replace(/[^a-z0-9_-]/gi, '')
		.slice(0, 40);

	redirect(302, `/?utm_source=${source || 'invite'}`);
};
