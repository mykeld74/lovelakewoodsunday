<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		title,
		lede,
		align = 'start',
		children
	}: {
		eyebrow?: string;
		title: string;
		lede?: string;
		align?: 'start' | 'center';
		children?: Snippet;
	} = $props();
</script>

<div class="head" class:center={align === 'center'}>
	{#if eyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	<h2 class="h2">{title}</h2>
	{#if lede}
		<p class="lede">{lede}</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.head {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		max-width: 44rem;
	}

	.head.center {
		align-items: center;
		text-align: center;
		margin-inline: auto;
	}

	.center :global(.lede) {
		margin-inline: auto;
	}
</style>
