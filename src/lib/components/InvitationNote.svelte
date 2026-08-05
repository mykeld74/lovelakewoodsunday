<script lang="ts">
	/**
	 * The heart of the site. Everything else is logistics — this is the part
	 * that has to land for someone who is nervous about walking in.
	 */
	const lines = ['You are invited.', 'You are welcome.', 'There is a place for you.'];

	let section = $state<HTMLElement>();
	/** Only hide the lines once JS is running and can guarantee showing them again. */
	let armed = $state(false);
	let revealed = $state(false);

	$effect(() => {
		if (!section) return;

		const motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!motionOk || typeof IntersectionObserver !== 'function') return;

		armed = true;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					revealed = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(section);

		// Belt and braces: these three lines are the most important words on the
		// page, so they get shown no matter what the observer does.
		const failsafe = setTimeout(() => (revealed = true), 2000);

		return () => {
			observer.disconnect();
			clearTimeout(failsafe);
		};
	});
</script>

<section
	bind:this={section}
	class="section note"
	class:armed={armed && !revealed}
	aria-labelledby="invitation-heading"
>
	<div class="container container-narrow">
		<p class="eyebrow">An open invitation</p>

		<h2 id="invitation-heading" class="statement">
			{#each lines as line, i (line)}
				<span style:--i={i}>{line}</span>
			{/each}
		</h2>

		<div class="body">
			<p>
				Maybe church has been part of your life since you were a kid. Maybe you walked away years
				ago and have not looked back. Maybe you have never been to one and have always been a little
				curious — or a little wary.
			</p>
			<p>
				All of that is welcome here. You can come, sit down, and take it in without anyone asking
				anything of you. No sign-in sheet, no raised hands, no one working the room. Just one
				morning, in a high school gym, with your neighbors.
			</p>
		</div>
	</div>
</section>

<style>
	.note {
		text-align: center;
		padding-block: clamp(3.5rem, 8vw, 6.5rem);
	}

	.statement {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		margin-top: 1.25rem;
		font-family: var(--font-display);
		font-size: clamp(1.85rem, 5.6vw, 3.4rem);
		font-weight: 500;
		font-variation-settings: 'opsz' 72;
		line-height: 1.12;
		letter-spacing: -0.025em;
	}

	/*
		Visible by default. `.armed` is only ever added by script, and only when
		the reveal is guaranteed to follow — so with no JS, a failed observer, or
		reduced motion, the text simply reads as normal.
	*/
	.statement span {
		transition:
			opacity 0.7s ease,
			transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
		transition-delay: calc(var(--i) * 130ms);
	}

	.armed .statement span {
		opacity: 0;
		transform: translateY(0.5rem);
		transition: none;
	}

	.statement span:nth-child(2) {
		color: var(--teal);
	}

	.statement span:nth-child(3) {
		color: var(--clay);
		font-style: italic;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 40rem;
		margin: clamp(1.75rem, 4vw, 2.75rem) auto 0;
		font-size: clamp(1.0625rem, 1.7vw, 1.1875rem);
		color: var(--ink-soft);
		text-align: left;
	}

	@media (min-width: 640px) {
		.body {
			text-align: center;
		}
	}
</style>
