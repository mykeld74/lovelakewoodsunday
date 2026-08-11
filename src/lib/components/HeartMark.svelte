<script lang="ts">
	/**
	 * The event mark: a heart with light rays.
	 *
	 * Shared by the wordmark, favicon, and hero so the brand reads as one thing
	 * wherever it shows up.
	 */
	let { size = 40, class: className = '' }: { size?: number; class?: string } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 48 48"
	fill="none"
	role="presentation"
	aria-hidden="true"
	class={className}
>
	<path
		d="M24 8.5v-5M24 44.5v-5M8.5 24h-5M44.5 24h-5M12.2 12.2l-3.5-3.5M39.3 39.3l-3.5-3.5M35.8 12.2l3.5-3.5M12.2 35.8l-3.5 3.5"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
	/>
	<path
		d="M24 36s-9.5-5.8-9.5-12a5.3 5.3 0 0 1 9.5-3.3A5.3 5.3 0 0 1 33.5 24C33.5 30.2 24 36 24 36Z"
		fill="currentColor"
	/>
</svg>
