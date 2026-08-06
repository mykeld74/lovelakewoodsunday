<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ChurchesSection from '$lib/components/ChurchesSection.svelte';
	import FindChurchSection from '$lib/components/FindChurchSection.svelte';
	import PageNext from '$lib/components/PageNext.svelte';
	import { churches } from '$lib/data/churches';
</script>

<Seo
	title="The churches"
	description="The {churches.length} Lakewood churches hosting Love Lakewood Sunday — where each one gathers, when, and how to visit any Sunday."
/>

<ChurchesSection level={1} />
<FindChurchSection />

<PageNext
	next={{
		href: '/visit',
		label: 'Plan your visit',
		blurb: 'Parking, accessibility, when to arrive, and what to wear.'
	}}
	other={[
		{ href: '/what-to-expect', label: 'What to expect' },
		{ href: '/faq', label: 'Questions' }
	]}
/>
