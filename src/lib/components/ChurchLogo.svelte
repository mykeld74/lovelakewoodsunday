<script lang="ts">
	import type { Church } from '$lib/data/churches';

	let { church, size = 56 }: { church: Church; size?: number } = $props();
</script>

{#if church.logo}
	<img class="logo" src={church.logo} alt="{church.name} logo" style:--size="{size}px" />
{:else}
	<!--
		Identical placeholder treatment for every church — same shape, same
		colors, only the initials change — so the page never looks like it is
		promoting whichever church happened to send artwork first.
	-->
	<span class="monogram" style:--size="{size}px" aria-hidden="true">{church.initials}</span>
{/if}

<style>
	.logo {
		height: var(--size);
		width: auto;
		max-width: calc(var(--size) * 3.4);
		object-fit: contain;
	}

	.monogram {
		display: grid;
		place-items: center;
		width: var(--size);
		height: var(--size);
		flex-shrink: 0;
		border-radius: calc(var(--size) * 0.26);
		background: linear-gradient(150deg, var(--sand), var(--paper));
		border: 1px solid var(--line-strong);
		color: var(--teal);
		font-family: var(--font-display);
		font-size: calc(var(--size) * 0.36);
		font-weight: 600;
		font-variation-settings: 'opsz' 24;
		letter-spacing: 0.01em;
	}
</style>
