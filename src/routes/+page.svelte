<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import InvitationNote from '$lib/components/InvitationNote.svelte';
	import NextSteps from '$lib/components/NextSteps.svelte';
	import ChurchesSection from '$lib/components/ChurchesSection.svelte';
	import InviteSection from '$lib/components/InviteSection.svelte';
	import VolunteerSection from '$lib/components/VolunteerSection.svelte';
	import { event, venue, site, addressLine, media } from '$lib/config/site';

	// Structured data so the event can surface directly in search. The FAQ
	// equivalent lives on /faq, alongside the questions themselves.
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: site.name,
		description: site.description,
		startDate: `${event.startsAt}-06:00`,
		endDate: `${event.endsAt}-06:00`,
		eventStatus: 'https://schema.org/EventScheduled',
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		image: new URL(media.socialImage, site.url).href,
		url: site.url,
		isAccessibleForFree: true,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock',
			url: site.url
		},
		location: {
			'@type': 'Place',
			name: `${venue.name} ${venue.room}`,
			address: {
				'@type': 'PostalAddress',
				streetAddress: venue.street,
				addressLocality: venue.city,
				addressRegion: venue.state,
				postalCode: venue.zip,
				addressCountry: 'US'
			},
			geo: { '@type': 'GeoCoordinates', latitude: venue.lat, longitude: venue.lng }
		}
	};

	/*
		Assembled from fragments: Svelte scans raw source for `<script` before
		parsing, so a literal one here would be mistaken for a second top-level
		script block. Escaping `<` in the payload keeps any content that later
		grows an angle bracket from closing the tag early.
	*/
	const jsonLdTag =
		'<' +
		'script type="application/ld+json">' +
		JSON.stringify(jsonLd).replace(/</g, '\\u003c') +
		'</' +
		'script>';
</script>

<Seo />

<svelte:head>
	<meta name="geo.placename" content="{venue.name}, {addressLine}" />
	<!-- Safe: built above from our own content, with `<` escaped in the payload. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdTag}
</svelte:head>

<Hero />
<InvitationNote />
<NextSteps />
<ChurchesSection />
<InviteSection />
<VolunteerSection />
