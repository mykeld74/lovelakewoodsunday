<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import VisitSection from '$lib/components/VisitSection.svelte';
	import KidsSection from '$lib/components/KidsSection.svelte';
	import PageNext from '$lib/components/PageNext.svelte';
	import { event, venue, addressLine } from '$lib/config/site';
</script>

<Seo
	title="Plan your visit"
	description="Where to park, where to walk in, accessible parking and drop-off, and what to do with the kids — everything you need before Love Lakewood Sunday on {event.dateLabel} at {venue.name}, {addressLine}."
/>

<VisitSection level={1} />
<KidsSection />

<PageNext
	next={{
		href: '/what-to-expect',
		label: 'What to expect',
		blurb: 'What actually happens in the hour.'
	}}
	other={[
		{ href: '/faq', label: 'Questions' },
		{ href: '/churches', label: 'The churches' }
	]}
/>
