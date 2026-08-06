<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import PageNext from '$lib/components/PageNext.svelte';

	let { form } = $props();
</script>

<Seo
	title="Contact"
	description="Have a question about Love Lakewood Sunday? Send it over — a real person from one of the participating churches will get back to you."
/>

<ContactSection {form} level={1} />

<PageNext
	next={{
		href: '/faq',
		label: 'The questions people ask',
		blurb: 'Yours may already be answered there.',
		cta: 'Read the answers'
	}}
	other={[
		{ href: '/visit', label: 'Plan your visit' },
		{ href: '/volunteer', label: 'Serve at the event' }
	]}
/>
