<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';

	let {
		message,
		id
	}: {
		message?: string;
		id?: string;
	} = $props();
</script>

{#if message}
	<p class="error-text" {id} role="alert" transition:slide={{ duration: 220, easing: quadOut }}>
		{message}
	</p>
{/if}
