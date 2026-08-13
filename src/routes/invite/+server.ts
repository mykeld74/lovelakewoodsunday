import { redirect } from '@sveltejs/kit';
import { campaignTarget } from '$lib/config/site';
import type { RequestHandler } from './$types';

/**
 * Short link for print, pulpit announcements, QR codes, and anything a person
 * will actually read: lovelakewoodsunday.org/invite → the home page, tagged
 * with the UTM parameters Google Analytics needs.
 *
 *   /invite            → utm_source=invite,   utm_medium=link
 *   /invite?s=text     → utm_source=sms,      utm_medium=text
 *   /invite?s=bulletin → utm_source=bulletin, utm_medium=print
 *
 * `?p=` records which part of the site handed the link out (utm_content).
 * The full table lives in `src/lib/config/site.ts`.
 */
export const GET: RequestHandler = ({ url }) => {
	const code = url.searchParams.get('s') ?? url.searchParams.get('source') ?? 'invite';
	const placement = url.searchParams.get('p') ?? undefined;

	// 302 rather than 301: these codes get retuned during a campaign, and a
	// permanent redirect would be cached in people's browsers.
	redirect(302, campaignTarget(code, placement));
};
