import comunidadCristianaColoradoLogo from '$lib/assets/churchLogos/ComunidadCristianaColorado.png';
import graceFellowshipLogo from '$lib/assets/churchLogos/GraceFellowshipLogo.webp';
import lakewoodVineyardLogo from '$lib/assets/churchLogos/LakewoodVineyardLogo.webp';
import sietePilaresLogo from '$lib/assets/churchLogos/SietePilares.webp';
import bridgeChurchLogo from '$lib/assets/churchLogos/BridgeChurchLogo.webp';
import westwoodsCcLogo from '$lib/assets/churchLogos/WestwoodsCCLogo.webp';

export type Church = {
	id: string;
	/** Full name as the church itself writes it. */
	name: string;
	/** Initials used for the placeholder tile until a logo file is supplied. */
	initials: string;
	/**
	 * Resolved URL from `$lib/assets/churchLogos/`. Transparent WebP/PNG/SVG,
	 * roughly 3:1, dark artwork on a transparent background works best.
	 */
	logo?: string;
	url?: string;
	street?: string;
	city?: string;
	/** Sunday gathering times, as the church words them. */
	serviceTimes?: string;
	/** One sentence, written by the church about itself. */
	blurb?: string;
	/** Set when the church gathers in a language other than English. */
	language?: string;
};

/**
 * Participating churches.
 *
 * Deliberately listed in alphabetical order and rendered identically — this is
 * a shared city event, and no church is featured above another. Keep it that
 * way when adding churches: append here, don't reorder for prominence.
 *
 * Details confirmed from each church's own website in August 2026. Anything
 * left blank is waiting on the church — see HANDOFF.md.
 */
export const churches: Church[] = [
	{
		id: 'comunidad-cristiana-colorado',
		name: 'Comunidad Cristiana Colorado',
		initials: 'CCC',
		logo: comunidadCristianaColoradoLogo,
		url: 'https://www.comunidadcristianacolorado.com/',
		// TODO: confirm address and Sunday service times with the congregation.
		language: 'Servicios en español'
	},
	{
		id: 'grace-fellowship',
		name: 'Grace Fellowship',
		initials: 'GF',
		logo: graceFellowshipLogo,
		url: 'https://www.gfol.org',
		street: '9210 W 2nd Ave',
		city: 'Lakewood, CO 80226',
		serviceTimes: 'Sundays at 9:00 & 10:30 a.m.'
	},
	{
		id: 'lakewood-vineyard',
		name: 'Lakewood Vineyard',
		initials: 'LV',
		logo: lakewoodVineyardLogo,
		url: 'https://lakewoodvineyard.org',
		street: '6800 W Hampden Ave',
		city: 'Lakewood, CO 80227',
		serviceTimes: 'Sundays at 10:00 a.m.'
	},
	{
		id: 'siete-pilares',
		name: 'Siete Pilares',
		initials: 'SP',
		logo: sietePilaresLogo,
		url: 'https://www.facebook.com/iglesia.siete.pilares.denver',
		// TODO: confirm address with the congregation.
		language: 'Servicios en español'
	},
	{
		id: 'the-bridge-at-bear-creek',
		name: 'The Bridge at Bear Creek',
		initials: 'BC',
		logo: bridgeChurchLogo,
		url: 'https://bridgebc.org',
		street: '3101 S Kipling St',
		city: 'Lakewood, CO 80227',
		serviceTimes: 'Sundays at 8:45 & 10:30 a.m.'
	},
	{
		id: 'westwoods',
		name: 'Westwoods Community Church',
		initials: 'WW',
		logo: westwoodsCcLogo,
		url: 'https://westwoodscc.org',
		street: '7700 W Woodard Dr',
		city: 'Lakewood, CO 80227'
		// TODO: confirm current Sunday service times.
	}
];
