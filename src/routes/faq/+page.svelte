<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import FaqSection from '$lib/components/FaqSection.svelte';
	import PageNext from '$lib/components/PageNext.svelte';
	import { faqs } from '$lib/data/faq';

	// Structured data lives with the questions themselves so search engines
	// can surface an answer directly. See the note in `src/routes/+page.svelte`
	// for why the tag is assembled from fragments.
	const jsonLdTag =
		'<' +
		'script type="application/ld+json">' +
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: { '@type': 'Answer', text: faq.answer.join(' ') }
			}))
		}).replace(/</g, '\\u003c') +
		'</' +
		'script>';
</script>

<Seo
	title="Questions"
	description="Is everyone welcome? Is there a cost? What if I've had a bad experience with church? Plain answers to the questions people actually ask about Love Lakewood Sunday."
/>

<svelte:head>
	<!-- Safe: built above from our own content, with `<` escaped in the payload. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdTag}
</svelte:head>

<FaqSection level={1} />

<PageNext
	next={{
		href: '/contact',
		label: 'Ask your own question',
		blurb: 'A real person will get back to you, usually within a day or two.',
		cta: 'Send us a note'
	}}
	other={[
		{ href: '/visit', label: 'Plan your visit' },
		{ href: '/what-to-expect', label: 'What to expect' }
	]}
/>
