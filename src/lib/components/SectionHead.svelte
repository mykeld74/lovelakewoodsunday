<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		title,
		lede,
		align = 'start',
		/**
		 * 1 when this section leads its own page, so the page gets exactly one
		 * <h1>. The visual size never changes — only the outline does.
		 */
		level = 2,
		children
	}: {
		eyebrow?: string;
		title: string;
		lede?: string;
		align?: 'start' | 'center';
		level?: 1 | 2;
		children?: Snippet;
	} = $props();
</script>

<div class="head" class:center={align === 'center'}>
	{#if eyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	<svelte:element this={level === 1 ? 'h1' : 'h2'} class="h2">{title}</svelte:element>
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
