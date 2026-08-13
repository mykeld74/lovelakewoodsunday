import QRCode from 'qrcode';
import { inviteLink, type ShareCode } from '$lib/config/site';
import type { RequestHandler } from './$types';

/**
 * QR code for the invitation link, as SVG so it stays crisp on a printed
 * banner or a slide. `?source=` tags where the scan came from, e.g.
 * /qr.svg?source=bulletin
 */
export const GET: RequestHandler = async ({ url }) => {
	// A short target keeps the QR's data density low, so it scans from
	// further away and survives being printed small.
	const code = (url.searchParams.get('source') ?? 'qr').replace(/[^a-z0-9_-]/gi, '').slice(0, 40);
	const target = inviteLink((code || 'qr') as ShareCode);

	const svg = await QRCode.toString(target, {
		type: 'svg',
		errorCorrectionLevel: 'M',
		margin: 2,
		width: 1024,
		color: { dark: '#113240ff', light: '#fcf8f2ff' }
	});

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
