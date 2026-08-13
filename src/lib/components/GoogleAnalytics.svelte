<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { dev } from '$app/environment';

	/** The snippet in app.html already records the first page. Skip that one. */
	let isFirstLoad = true;

	afterNavigate(() => {
		if (dev || isFirstLoad) {
			isFirstLoad = false;
			return;
		}

		window.gtag?.('event', 'page_view', {
			page_title: document.title,
			page_location: page.url.href,
			page_path: `${page.url.pathname}${page.url.search}`
		});
	});
</script>
