import { site, event, venue, addressLine } from '$lib/config/site';
import type { RequestHandler } from './$types';

/**
 * Calendar file for the "Add to your calendar" button.
 *
 * Times are emitted in UTC because every calendar app handles that correctly
 * without needing an embedded VTIMEZONE block. September 20, 2026 falls in
 * Mountain Daylight Time (UTC-6), so 10:00 a.m. local is 16:00 UTC.
 */
const UTC_OFFSET_HOURS = 6;

function toUtcStamp(local: string): string {
	const date = new Date(`${local}Z`);
	date.setUTCHours(date.getUTCHours() + UTC_OFFSET_HOURS);
	return date
		.toISOString()
		.replace(/[-:]/g, '')
		.replace(/\.\d{3}/, '');
}

/** Folds long lines at 75 octets, as iCalendar requires. */
function fold(line: string): string {
	if (line.length <= 74) return line;
	const parts = [line.slice(0, 74)];
	let rest = line.slice(74);
	while (rest.length > 73) {
		parts.push(' ' + rest.slice(0, 73));
		rest = rest.slice(73);
	}
	parts.push(' ' + rest);
	return parts.join('\r\n');
}

function escape(value: string): string {
	return value.replace(/([\\,;])/g, '\\$1').replace(/\n/g, '\\n');
}

export const GET: RequestHandler = async () => {
	const description = [
		'Lakewood churches are coming together for one morning of worship, hope, and community.',
		'',
		'The service lasts about an hour. It is free, there is no registration, and no offering will be taken.',
		'Come as you are — kids are welcome and stay with their parents.',
		'',
		`Park east of the main entrance. Arriving 15-20 minutes early gives you time to park and find a seat.`,
		'',
		`Full details: ${site.url}`
	].join('\n');

	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Love Lakewood Sunday//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:love-lakewood-sunday-2026@${new URL(site.url).hostname}`,
		`DTSTAMP:${toUtcStamp('2026-08-01T12:00:00')}`,
		`DTSTART:${toUtcStamp(event.startsAt)}`,
		`DTEND:${toUtcStamp(event.endsAt)}`,
		`SUMMARY:${escape(site.name)}`,
		`LOCATION:${escape(`${venue.name} ${venue.room}, ${addressLine}`)}`,
		`DESCRIPTION:${escape(description)}`,
		`URL:${site.url}`,
		'STATUS:CONFIRMED',
		'TRANSP:OPAQUE',
		'BEGIN:VALARM',
		'TRIGGER:-PT1H',
		'ACTION:DISPLAY',
		'DESCRIPTION:Love Lakewood Sunday starts in an hour',
		'END:VALARM',
		'END:VEVENT',
		'END:VCALENDAR'
	];

	return new Response(lines.map(fold).join('\r\n'), {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': 'attachment; filename="love-lakewood-sunday.ics"',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
