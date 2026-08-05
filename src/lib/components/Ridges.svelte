<script lang="ts">
	/**
	 * Foothill silhouettes used to close out a section. Lakewood sits right up
	 * against these, so they read as "here" without being a literal photograph.
	 */
	let {
		/** Color of the section that comes next — the front ridge fills into it. */
		into = 'var(--sand)',
		flip = false
	}: { into?: string; flip?: boolean } = $props();
</script>

<svg
	class="ridges"
	class:flip
	viewBox="0 0 1440 140"
	preserveAspectRatio="none"
	role="presentation"
	aria-hidden="true"
>
	<path
		d="M0 96c120-46 210-58 320-24s186 62 300 30 214-72 340-52 268 68 350 58 130-26 130-26v58H0z"
		fill="var(--teal)"
		opacity="0.14"
	/>
	<path
		d="M0 118c150-38 254-30 372 4s220 40 344 6 232-46 358-22 226 44 366 22v42H0z"
		fill="var(--teal)"
		opacity="0.22"
	/>
	<path
		d="M0 140h1440v-8c-140 12-250-8-370-26s-240-14-372 12-234 34-354 14S0 108 0 108z"
		fill={into}
	/>
	<rect y="132" width="1440" height="8" fill={into} />
</svg>

<style>
	.ridges {
		display: block;
		width: 100%;
		height: clamp(60px, 9vw, 130px);
	}

	.flip {
		transform: scaleX(-1);
	}
</style>
