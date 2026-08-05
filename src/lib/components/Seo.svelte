<script lang="ts">
	import { page } from '$app/state';
	import { site, media } from '$lib/config/site';

	let {
		title,
		description = site.description,
		/** Set false on pages that shouldn't appear in search results. */
		index = true
	}: { title?: string; description?: string; index?: boolean } = $props();

	const fullTitle = $derived(title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`);
	const canonical = $derived(new URL(page.url.pathname, site.url).href);
	const image = $derived(new URL(media.socialImage, site.url).href);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if !index}
		<meta name="robots" content="noindex, follow" />
	{/if}

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content="{site.name} — {site.tagline}" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<meta name="theme-color" content="#fcf8f2" />
</svelte:head>
