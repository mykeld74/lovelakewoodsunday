<script lang="ts">
	import Icon from './Icon.svelte';

	/**
	 * The home page's signposts. Someone who has just decided they might come
	 * has exactly three follow-up questions, so there are exactly three cards —
	 * phrased as the questions themselves rather than as section names.
	 */
	const steps = [
		{
			href: '/visit',
			icon: 'pin',
			eyebrow: 'Getting there',
			title: 'Plan your visit',
			blurb:
				'Where to park, where to walk in, accessible parking and drop-off, and what to do with the kids.'
		},
		{
			href: '/what-to-expect',
			icon: 'music',
			eyebrow: 'The hour itself',
			title: 'What to expect',
			blurb:
				'Exactly what happens, in order — and what will not happen. About an hour, start to finish.'
		},
		{
			href: '/faq',
			icon: 'speech',
			eyebrow: 'Straight answers',
			title: 'Questions',
			blurb:
				'Is it free? What do I wear? What if church has hurt me before? Asked and answered plainly.'
		}
	];
</script>

<section class="section steps-section">
	<div class="container">
		<ul class="steps">
			{#each steps as step (step.href)}
				<li>
					<a href={step.href}>
						<span class="icon"><Icon name={step.icon} size={22} /></span>
						<span class="eyebrow">{step.eyebrow}</span>
						<span class="title">{step.title}</span>
						<span class="blurb">{step.blurb}</span>
						<span class="go">
							Take a look
							<Icon name="arrow" size={16} />
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.steps-section {
		padding-top: 0;
	}

	.steps {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 1.15rem;
	}

	/*
		Scroll-driven reveal, matching the invitation above it: the cards rise as
		the reader brings them up the screen rather than playing on a timer.

		Applied to the <li>, not the <a> inside it. The link owns a hover
		transform, and an animation with `fill: both` outranks normal
		declarations — so animating the link would quietly kill the hover lift.
		Separating them lets each own one transform.

		On a wide screen the three cards sit side by side, so their own view
		timelines are near-identical and the stagger has to come from the ranges
		below rather than from their position on the page.

		Behind @supports because without it a browser that ignores
		`animation-timeline` would still honour the keyframe's `opacity: 0` and
		hide the page's three signposts. Those browsers get static cards, which
		is exactly what they show today.
	*/
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.steps li {
				animation: step-rise linear both;
				animation-timeline: view();
				animation-range: cover 12% cover 36%;
			}

			.steps li:nth-child(2) {
				animation-range: cover 17% cover 41%;
			}

			.steps li:nth-child(3) {
				animation-range: cover 22% cover 46%;
			}
		}
	}

	@keyframes step-rise {
		from {
			opacity: 0;
			transform: translateY(1rem);
		}
	}

	a {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 0.4rem;
		padding: clamp(1.5rem, 3vw, 2rem);
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		text-decoration: none;
		box-shadow: var(--shadow-sm);
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease,
			border-color 0.18s ease;
	}

	a:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
		border-color: var(--line-strong);
	}

	.icon {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		margin-bottom: 0.6rem;
		border-radius: var(--radius);
		background: var(--sand);
		color: var(--teal);
	}

	.title {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 600;
		font-variation-settings: 'opsz' 32;
		line-height: 1.2;
	}

	.blurb {
		margin-top: 0.15rem;
		font-size: 0.9375rem;
		line-height: 1.55;
		color: var(--ink-soft);
		flex: 1;
	}

	.go {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		margin-top: 1rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--teal);
	}

	a:hover .go :global(svg) {
		transform: translateX(3px);
	}

	.go :global(svg) {
		transition: transform 0.18s ease;
	}

	@media (min-width: 800px) {
		.steps {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
