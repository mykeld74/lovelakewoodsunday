import QRCode from 'qrcode';
import { site } from '$lib/config/site';
import type { RequestHandler } from './$types';

/** Raster version of the invitation QR code, for tools that won't take an SVG. */
export const GET: RequestHandler = async ({ url }) => {
	const source = (url.searchParams.get('source') ?? 'qr').replace(/[^a-z0-9_-]/gi, '').slice(0, 40);
	const target = `${site.url}/?utm_source=${source || 'qr'}`;

	const size = Math.min(2048, Math.max(256, Number(url.searchParams.get('size')) || 1024));

	const png = await QRCode.toBuffer(target, {
		type: 'png',
		errorCorrectionLevel: 'M',
		margin: 2,
		width: size,
		color: { dark: '#113240ff', light: '#fcf8f2ff' }
	});

	return new Response(new Uint8Array(png), {
		headers: {
			'Content-Type': 'image/png',
			'Content-Disposition': 'inline; filename="love-lakewood-sunday-qr.png"',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
