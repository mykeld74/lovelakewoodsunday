<script lang="ts">
	/**
	 * The divider between two sections: foothill silhouettes that hand the page
	 * off from one background colour to the next. Lakewood sits right up against
	 * these, so they read as "here" without being a literal photograph.
	 */
	let {
		/** Colour of the section that comes next — the front ridge fills into it. */
		into = 'var(--sand)',
		/** Farthest ridge — solid so it still reads over photography. */
		back = '#dfdbd0',
		/** Middle ridge. */
		mid = '#bfbfb4',
		flip = false
	}: { into?: string; back?: string; mid?: string; flip?: boolean } = $props();
</script>

<svg
	class="ridges"
	class:flip
	viewBox="0 0 1440 140"
	preserveAspectRatio="none"
	role="presentation"
	aria-hidden="true"
>
	<!--
		Every ridge runs off both edges and then closes down to the bottom
		corners, so the shapes look like they continue past the page rather than
		being sliced off. The front ridge is filled with the next section's
		colour and covers the full bottom edge, which is what makes this read as
		a handover between two sections instead of a band sitting on top of one.
	-->
	<path
		d="M0 44C190 10 350 14 520 48s350 42 530 12c150-26 280-22 390-6v86H0Z"
		fill={back}
	/>
	<path
		d="M0 76C210 44 395 52 585 84s370 30 550 4c135-20 235-16 305-6v58H0Z"
		fill={mid}
	/>
	<path d="M0 106C240 78 440 92 640 114s380 18 560 0c120-12 195-8 240-2v28H0Z" fill={into} />
</svg>

<style>
	.ridges {
		display: block;
		width: 100%;
		height: clamp(60px, 9vw, 130px);

		/*
			The hero's glow is absolutely positioned, so without this it paints
			over the divider and stops dead at the hero's clipped edge — which
			looked like a hard horizontal cut straight across the page.
		*/
		position: relative;
		z-index: 1;

		/* Guards against a hairline seam from fractional heights. */
		margin-bottom: -1px;
	}

	.flip {
		transform: scaleX(-1);
	}
</style>
