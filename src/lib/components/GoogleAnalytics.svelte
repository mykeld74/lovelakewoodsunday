<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { dev } from '$app/environment';

	const measurementId = 'G-MDWF5EPCXL';

	afterNavigate(() => {
		if (dev) return;
		window.gtag?.('event', 'page_view', {
			page_title: document.title,
			page_location: page.url.href,
			page_path: `${page.url.pathname}${page.url.search}`
		});
	});
</script>

<svelte:head>
	{#if !dev}
		<script async src="https://www.googletagmanager.com/gtag/js?id={measurementId}"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', 'G-MDWF5EPCXL', { send_page_view: false });
		</script>
	{/if}
</svelte:head>
