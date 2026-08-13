/**
 * Central configuration for Love Lakewood Sunday.
 *
 * Everything a non-developer is likely to change lives in this file or in
 * `src/lib/data/`. Items marked TODO are waiting on information from the
 * planning team — see HANDOFF.md for the full checklist.
 */

export const site = {
	name: 'Love Lakewood Sunday',
	tagline: 'One Sunday. One Church. One City.',
	description:
		'Lakewood churches are coming together for one morning of worship, hope, and community. Sunday, September 20, 2026 at Bear Creek High School. Everyone is welcome.',

	/** Canonical production URL. Used for share links, QR codes, and Open Graph tags. */
	url: 'https://lovelakewoodsunday.org',

	/** Where contact-form questions should be answered from. */
	contactEmail: 'hello@lovelakewoodsunday.org' // TODO: confirm real inbox
} as const;

export const event = {
	name: 'Love Lakewood Sunday',

	/** Local wall-clock start/end. The service is planned for about one hour. */
	startsAt: '2026-09-20T10:00:00',
	endsAt: '2026-09-20T11:00:00',
	timeZone: 'America/Denver',

	dateLabel: 'Sunday, September 20, 2026',
	dateShort: 'Sun, Sept 20',
	timeLabel: '10:00 a.m.',
	durationLabel: 'About one hour',
	arriveBy:
		'Doors open at 9:30 a.m. — arriving 15–20 minutes early gives you time to park and find a seat.',

	cost: 'Free — and no offering will be taken.'
} as const;

export const venue = {
	name: 'Bear Creek High School',
	room: 'Gymnasium',
	street: '9800 W Dartmouth Pl',
	city: 'Lakewood',
	state: 'CO',
	zip: '80227',

	/** Approximate center of the campus; used for the map embed. */
	lat: 39.6553,
	lng: -105.1063,

	parking:
		'Park in the school lot east of the main entrance. Signs and volunteers will help direct you when you arrive.',
	accessibility:
		'Accessible parking is available, guests may be dropped off directly in front of the school, and the gymnasium is wheelchair accessible.'
} as const;

export const addressLine = `${venue.street}, ${venue.city}, ${venue.state} ${venue.zip}`;
export const addressQuery = encodeURIComponent(`${venue.name}, ${addressLine}`);

export const maps = {
	/** Keyless Google Maps embed — no API key or billing account required. */
	embed: `https://www.google.com/maps?q=${addressQuery}&output=embed`,
	google: `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`,
	apple: `https://maps.apple.com/?daddr=${addressQuery}`,
	/** Falls back to the browser's default map app on most devices. */
	generic: `geo:${venue.lat},${venue.lng}?q=${addressQuery}`
} as const;

/**
 * Media that the planning team is still producing. Set the value and the
 * matching section switches from its placeholder state to the real thing —
 * no other code changes needed.
 */
export const media = {
	/**
	 * The shared event graphic every participating church is using.
	 * Drop the file in `static/` and set the path, e.g. '/event-graphic.jpg'.
	 */
	eventGraphic: '' as string,

	/**
	 * Pastor welcome video. Accepts a YouTube or Vimeo watch/share URL —
	 * it is converted to a privacy-friendly embed automatically.
	 */
	welcomeVideo: '' as string,
	welcomeVideoPoster: '' as string,

	/** Simple parking map or diagram, e.g. '/parking-map.png'. */
	parkingMap: '' as string,

	/** Open Graph / social sharing image (1200×630 recommended). */
	socialImage: '/og-image.png' as string
} as const;

/**
 * External form fallbacks. Leave empty to use the built-in forms on this site.
 * If the team would rather collect responses in an existing tool, paste the
 * URL here and the buttons will point there instead.
 */
export const externalForms = {
	volunteer: '' as string,
	contact: '' as string
} as const;

/**
 * Campaign tagging for Google Analytics.
 *
 * Shared links are short — `lovelakewoodsunday.org/invite?s=text` — and the
 * server expands the code into a full set of UTM parameters when it redirects.
 * Two reasons for the indirection:
 *
 *  1. People *read* these links. They arrive in a text message from a friend,
 *     and a 90-character tracking URL makes a personal invitation look like
 *     marketing.
 *  2. A short URL makes a much simpler, more scannable QR code.
 *
 * Keeping the table here means the tags can be renamed without touching a
 * single component. GA4 needs `utm_medium` as well as `utm_source` — with a
 * source alone it records the visit but files it under Unassigned.
 */
export const campaignName = 'love-lakewood-sunday';

/** Short code → the source/medium pair it expands to. */
export const shareSources = {
	invite: { source: 'invite', medium: 'link' },
	text: { source: 'sms', medium: 'text' },
	email: { source: 'email', medium: 'email' },
	facebook: { source: 'facebook', medium: 'social' },
	x: { source: 'x', medium: 'social' },
	social: { source: 'social', medium: 'social' },
	qr: { source: 'qr', medium: 'qr' },
	print: { source: 'print', medium: 'print' },
	bulletin: { source: 'bulletin', medium: 'print' },
	pulpit: { source: 'pulpit', medium: 'announcement' }
} as const;

export type ShareCode = keyof typeof shareSources;

/** Keeps anything reaching a URL to a safe, readable slug. */
function slug(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 40);
}

/**
 * The short link to hand out. `placement` records which part of this site
 * produced it — the home page or the church share kit — and becomes
 * `utm_content`.
 */
export function inviteLink(code: ShareCode = 'invite', placement?: string): string {
	const params = new URLSearchParams();
	if (code !== 'invite') params.set('s', code);
	if (placement) params.set('p', slug(placement));
	const query = params.toString();
	return `${site.url}/invite${query ? `?${query}` : ''}`;
}

/** Expands a short code into the tagged destination the redirect sends people to. */
export function campaignTarget(code: string, placement?: string): string {
	const known = shareSources[slug(code) as ShareCode];
	// An unrecognised code still gets tracked, just under its own name.
	const { source, medium } = known ?? { source: slug(code) || 'invite', medium: 'link' };

	const params = new URLSearchParams({
		utm_source: source,
		utm_medium: medium,
		utm_campaign: campaignName
	});
	if (placement) params.set('utm_content', slug(placement));

	return `/?${params}`;
}

/** Pre-written invitation copy used by the share buttons and the share kit. */
export const invitation = {
	short: `You're invited to Love Lakewood Sunday — one morning of worship, hope, and community with churches from all over Lakewood. Sunday, September 20 at 10 a.m., Bear Creek High School. Everyone is welcome.`,
	subject: `You're invited to Love Lakewood Sunday`,
	sms: `Hey! I'd love for you to come with me to Love Lakewood Sunday — Sunday, Sept 20 at 10am at Bear Creek High School. It's free, casual, and about an hour. Details here: `,
	email: `Hi,\n\nI wanted to invite you to something happening in our city.\n\nOn Sunday, September 20 at 10:00 a.m., churches from all over Lakewood are gathering for one service at Bear Creek High School. It's called Love Lakewood Sunday.\n\nIt's free, it's about an hour, you can wear whatever you want, and there's no pressure of any kind. Kids are welcome and stay with their parents.\n\nWhether church is part of your life or not, you're genuinely invited. I'd love for you to come with me.\n\nAll the details are here: `
} as const;
