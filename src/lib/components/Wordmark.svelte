<script lang="ts">
	import SunMark from './SunMark.svelte';

	let { size = 'md', tagline = false }: { size?: 'sm' | 'md' | 'lg'; tagline?: boolean } = $props();

	const markSize = $derived({ sm: 30, md: 36, lg: 52 }[size]);
</script>

<span class="wordmark {size}">
	<SunMark size={markSize} />
	<span class="text">
		<span class="name">Love&nbsp;Lakewood&nbsp;Sunday</span>
		{#if tagline}
			<span class="tagline">One Sunday. One Church. One City.</span>
		{/if}
	</span>
</span>

<style>
	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: inherit;
		text-decoration: none;
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.name {
		font-family: var(--font-display);
		font-weight: 600;
		font-variation-settings: 'opsz' 24;
		letter-spacing: -0.02em;
		line-height: 1.05;
	}

	.sm .name {
		font-size: 1.0625rem;
	}

	.md .name {
		font-size: 1.25rem;
	}

	.lg .name {
		font-size: 1.75rem;
	}

	.tagline {
		font-family: var(--font-body);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.11em;
		text-transform: uppercase;
		opacity: 0.62;
		line-height: 1.2;
	}
</style>
