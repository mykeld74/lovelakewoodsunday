<script lang="ts">
	import { faqs } from '$lib/data/faq';
	import Icon from './Icon.svelte';

	/** 1 when this section leads its own page, so each page has one <h1>. */
	let { level = 2 }: { level?: 1 | 2 } = $props();
</script>

<section id="faq" class="section">
	<div class="container">
		<div class="layout">
			<div class="intro">
				<p class="eyebrow">Questions</p>
				<svelte:element this={level === 1 ? 'h1' : 'h2'} class="h2"
					>The things people actually wonder about</svelte:element
				>
				<p class="lede">
					If something you are wondering isn’t here, ask us. No question is too basic, and nobody
					will add you to a list for asking.
				</p>
				<a class="btn btn-outline" href="/contact">
					<Icon name="message" size={18} />
					Ask your own question
				</a>
			</div>

			<div class="list">
				{#each faqs as faq (faq.id)}
					<!--
						`name` makes these exclusive — opening one closes another —
						same as a classic accordion, no script required.
					-->
					<details id="faq-{faq.id}" name="faq">
						<summary>
							<span>{faq.question}</span>
							<span class="chevron" aria-hidden="true"></span>
						</summary>
						<div class="answer">
							<div class="answerClip">
								<div class="answerBody">
									{#each faq.answer as paragraph (paragraph)}
										<p>{paragraph}</p>
									{/each}
								</div>
							</div>
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

	/*
		The UA sets content-visibility: hidden on closed details, which
		skips the panel in the render tree. First open then has no 0fr
		value to interpolate from — it snaps — and only later opens
		animate. Keep it visible; the grid clip below is what hides it.
	*/
	details::details-content {
		content-visibility: visible;
	}

	/*
		Slide with grid rows instead of height: auto — interpolates in every
		current browser, so close stays smooth even where interpolate-size
		isn't available yet.
	*/
	.answer {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.28s cubic-bezier(0.22, 1, 0.36, 1);
	}

	details[open] .answer {
		grid-template-rows: 1fr;
	}

	/* Clip layer is the grid item — padding lives one level deeper so 0fr
	   can actually reach zero (padding on the grid item itself won't). */
	.answerClip {
		min-height: 0;
		overflow: hidden;
	}

	.answerBody {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-bottom: 1.35rem;
		max-width: 44rem;
	}

	.answerBody p {
		color: var(--ink-soft);
	}

	@media (prefers-reduced-motion: reduce) {
		.answer {
			transition: none;
		}
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
