<script lang="ts">
	import { page } from '$app/state';
	import Icon from '$lib/components/Icon.svelte';
	import { event, venue } from '$lib/config/site';
</script>

<svelte:head>
	<title>Page not found · Love Lakewood Sunday</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="wrap">
	<div class="container container-narrow">
		<p class="eyebrow">{page.status}</p>
		<h1 class="h2">
			{page.status === 404 ? 'We can’t find that page.' : 'Something went wrong.'}
		</h1>
		<p class="lede">
			{page.status === 404
				? 'The link may be out of date. Everything about the morning is on the main page — including where to park and what to expect.'
				: 'That’s on us, not you. Try again in a moment, or head back to the main page.'}
		</p>

		<div class="facts">
			<p><strong>{event.dateLabel}</strong> at {event.timeLabel}</p>
			<p>{venue.name} {venue.room}, {venue.city}</p>
		</div>

		<div class="btn-row">
			<a class="btn btn-lg" href="/">
				Go to the event page
				<Icon name="arrow" size={18} />
			</a>
			<a class="btn btn-lg btn-outline" href="/#faq">Read the FAQ</a>
		</div>
	</div>
</section>

<style>
	.wrap {
		padding-block: clamp(4rem, 12vw, 8rem);
		background: linear-gradient(180deg, var(--sand), var(--cream));
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.85rem;
	}

	.facts {
		margin-top: 0.75rem;
		padding: 1rem 1.35rem;
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		font-size: 0.9375rem;
		color: var(--ink-soft);
	}

	.btn-row {
		margin-top: 1rem;
	}
</style>
