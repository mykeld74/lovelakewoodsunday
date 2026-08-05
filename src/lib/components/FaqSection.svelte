<script lang="ts">
	import { faqs } from '$lib/data/faq';
	import Icon from './Icon.svelte';

	const DURATION = 280;
	const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

	type Controls = { open: () => void; close: () => void };

	/**
	 * Expand and collapse the answers.
	 *
	 * The rule this is built around: an answer nobody can read is far worse
	 * than an answer that appears without motion. So the animation only ever
	 * *borrows* the panel — every path, including one where the browser never
	 * paints a frame, ends by clearing the inline styles and letting the
	 * element sit at its natural height. A CSS transition on
	 * `::details-content` cannot promise that: it parks the panel at zero
	 * height and depends on frames arriving to open it.
	 *
	 * With no JS at all, this is still a plain <details> list.
	 */
	/** Only ever the one that is open, so opening another can ease it shut. */
	let openPanel: Controls | null = null;

	function accordion(node: HTMLDetailsElement) {
		const summary = node.querySelector('summary')!;
		const answer = node.querySelector<HTMLElement>('.answer')!;

		let animation: Animation | null = null;
		let failsafe: ReturnType<typeof setTimeout> | undefined;
		let closing = false;

		/** The one place that decides the final state. Always reachable. */
		function rest(open: boolean) {
			clearTimeout(failsafe);
			animation = null;
			closing = false;
			answer.style.height = '';
			answer.style.overflow = '';
			node.open = open;
		}

		function play(from: number, to: number, endsOpen: boolean) {
			animation?.cancel();
			clearTimeout(failsafe);

			answer.style.overflow = 'hidden';
			answer.style.height = `${from}px`;

			animation = answer.animate(
				{ height: [`${from}px`, `${to}px`] },
				{ duration: DURATION, easing: EASING }
			);
			animation.onfinish = () => rest(endsOpen);

			// If frames never arrive — a background tab, a stalled compositor —
			// `onfinish` never fires. Land on the correct resting state anyway.
			failsafe = setTimeout(() => {
				animation?.cancel();
				rest(endsOpen);
			}, DURATION + 150);
		}

		const skipMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

		const controls: Controls = {
			open() {
				if (openPanel && openPanel !== controls) openPanel.close();
				openPanel = controls;

				// Read before cancelling, so interrupting a close resumes from
				// where it had got to rather than jumping.
				const from = node.open ? answer.getBoundingClientRect().height : 0;
				animation?.cancel();
				node.open = true;

				if (skipMotion()) return rest(true);

				/*
					`scrollHeight`, not `getBoundingClientRect()`. The content has
					only just been revealed, and until the browser lays it out the
					panel still measures its collapsed height — animating to that
					would clip the answer to a few stray pixels.
				*/
				play(from, answer.scrollHeight, true);
			},

			close() {
				if (openPanel === controls) openPanel = null;
				if (skipMotion()) return rest(false);

				const from = answer.getBoundingClientRect().height;
				closing = true;
				play(from, 0, false);
			}
		};

		function onSummaryClick(event: MouseEvent) {
			// Take over the native toggle so both directions can be animated.
			event.preventDefault();
			if (node.open && !closing) controls.close();
			else controls.open();
		}

		summary.addEventListener('click', onSummaryClick);

		return {
			destroy() {
				summary.removeEventListener('click', onSummaryClick);
				animation?.cancel();
				clearTimeout(failsafe);
				if (openPanel === controls) openPanel = null;
			}
		};
	}
</script>

<section id="faq" class="section">
	<div class="container">
		<div class="layout">
			<div class="intro">
				<p class="eyebrow">Questions</p>
				<h2 class="h2">The things people actually wonder about</h2>
				<p class="lede">
					If something you are wondering isn’t here, ask us. No question is too basic, and nobody
					will add you to a list for asking.
				</p>
				<a class="btn btn-outline" href="#contact">
					<Icon name="message" size={18} />
					Ask your own question
				</a>
			</div>

			<div class="list">
				{#each faqs as faq (faq.id)}
					<details id="faq-{faq.id}" use:accordion>
						<summary>
							<span>{faq.question}</span>
							<span class="chevron" aria-hidden="true"></span>
						</summary>
						<div class="answer">
							{#each faq.answer as paragraph (paragraph)}
								<p>{paragraph}</p>
							{/each}
						</div>
					</details>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.layout {
		display: grid;
		gap: clamp(2.25rem, 4vw, 4rem);
	}

	.intro {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.85rem;
	}

	.intro .btn {
		margin-top: 0.5rem;
	}

	.list {
		border-top: 1px solid var(--line);
	}

	details {
		border-bottom: 1px solid var(--line);
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.15rem 0;
		cursor: pointer;
		list-style: none;
		font-family: var(--font-display);
		font-size: clamp(1.0625rem, 1.9vw, 1.1875rem);
		font-weight: 600;
		font-variation-settings: 'opsz' 24;
		line-height: 1.3;
		transition: color 0.15s ease;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:hover {
		color: var(--teal);
	}

	.chevron {
		position: relative;
		flex-shrink: 0;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 50%;
		border: 1.5px solid var(--line-strong);
		transition:
			background-color 0.18s ease,
			border-color 0.18s ease;
	}

	/* Plus sign that becomes a minus when the answer is open. */
	.chevron::before,
	.chevron::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0.65rem;
		height: 1.5px;
		background: var(--ink);
		transform: translate(-50%, -50%);
		transition: transform 0.2s ease;
	}

	.chevron::after {
		transform: translate(-50%, -50%) rotate(90deg);
	}

	details[open] .chevron {
		background: var(--amber);
		border-color: var(--amber);
	}

	details[open] .chevron::after {
		transform: translate(-50%, -50%) rotate(180deg);
	}

	.answer {
		padding-bottom: 1.35rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 44rem;
	}

	/*
		No CSS transition on `::details-content` here, deliberately: it holds the
		panel at zero height and relies on frames arriving to open it, so a
		stalled compositor leaves the answer unreadable. The height is animated
		from the `accordion` action instead, which always resolves to the
		natural height.
	*/

	.answer p {
		color: var(--ink-soft);
	}

	@media (min-width: 960px) {
		.layout {
			grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
			align-items: start;
		}

		.intro {
			position: sticky;
			top: 6.5rem;
		}
	}
</style>
