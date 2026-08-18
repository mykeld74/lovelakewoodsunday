<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ExpectSection from '$lib/components/ExpectSection.svelte';
	import PageNext from '$lib/components/PageNext.svelte';
</script>

<Seo
	title="What to expect"
	description="Music, prayer, a moment for the kids, an encouraging message, and communion — about an hour in total. No registration, no offering, and nobody gets singled out."
/>

<ExpectSection level={1} />

<PageNext
	next={{
		href: '/visit',
		label: 'Plan your visit',
		blurb: 'Parking, accessibility, when to arrive, and what to wear.'
	}}
	other={[
		{ href: '/faq', label: 'Questions' },
		{ href: '/churches', label: 'The churches' }
	]}
/>
