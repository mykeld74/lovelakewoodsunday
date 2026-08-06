import { site } from '$lib/config/site';
import type { RequestHandler } from './$types';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/visit', priority: '0.9', changefreq: 'monthly' },
	{ path: '/what-to-expect', priority: '0.9', changefreq: 'monthly' },
	{ path: '/faq', priority: '0.8', changefreq: 'monthly' },
	{ path: '/churches', priority: '0.8', changefreq: 'monthly' },
	{ path: '/volunteer', priority: '0.7', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.5', changefreq: 'monthly' }
	// /share is intentionally absent — it is for participating churches, not guests.
];

export const GET: RequestHandler = async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `	<url>
		<loc>${site.url}${page.path}</loc>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
