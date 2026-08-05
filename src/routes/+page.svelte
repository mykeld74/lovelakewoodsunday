<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import InvitationNote from '$lib/components/InvitationNote.svelte';
	import VisitSection from '$lib/components/VisitSection.svelte';
	import ExpectSection from '$lib/components/ExpectSection.svelte';
	import KidsSection from '$lib/components/KidsSection.svelte';
	import WelcomeVideo from '$lib/components/WelcomeVideo.svelte';
	import ChurchesSection from '$lib/components/ChurchesSection.svelte';
	import VolunteerSection from '$lib/components/VolunteerSection.svelte';
	import InviteSection from '$lib/components/InviteSection.svelte';
	import FindChurchSection from '$lib/components/FindChurchSection.svelte';
	import FaqSection from '$lib/components/FaqSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import { event, venue, site, addressLine, media } from '$lib/config/site';
	import { faqs } from '$lib/data/faq';

	let { form } = $props();

	// Structured data so the event and its answers can surface directly in search.
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
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
			},
			{
				'@type': 'FAQPage',
				mainEntity: faqs.map((faq) => ({
					'@type': 'Question',
					name: faq.question,
					acceptedAnswer: { '@type': 'Answer', text: faq.answer.join(' ') }
				}))
			}
		]
	};

	/*
		Both tags are assembled from fragments: Svelte scans raw source for
		`<script` before parsing, so a literal one here would be mistaken for a
		second top-level script block. Escaping `<` in the payload keeps any
		content that later grows an angle bracket — a church name, an FAQ
		answer — from closing the tag early.
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
<VisitSection />
<ExpectSection />
<KidsSection />
<WelcomeVideo />
<ChurchesSection />
<VolunteerSection />
<InviteSection />
<FindChurchSection />
<FaqSection />
<ContactSection {form} />
