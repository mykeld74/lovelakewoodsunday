<script lang="ts">
	import Icon from './Icon.svelte';

	/**
	 * Keeps each page from dead-ending. Splitting the old single page means a
	 * guest can now land anywhere, so every page hands them the obvious next
	 * question rather than leaving them to find the nav.
	 */
	/**
	 * `cta` names the action at the destination. It defaults to "Keep reading",
	 * which is only true when the next page is more to read — a page that ends
	 * at a form or a map needs to say so.
	 */
	type Link = { href: string; label: string; blurb?: string; cta?: string };

	let { next, other = [] }: { next: Link; other?: Link[] } = $props();
</script>

<section class="section next-section">
	<div class="container">
		<div class="band">
			<a class="primary" href={next.href}>
				<span class="label">Next</span>
				<span class="title">{next.label}</span>
				{#if next.blurb}
					<span class="blurb">{next.blurb}</span>
				{/if}
				<span class="go">
					{next.cta ?? 'Keep reading'}
					<Icon name="arrow" size={16} />
				</span>
			</a>

			{#if other.length}
				<div class="others">
					<span class="label">Or jump to</span>
					<ul>
						{#each other as link (link.href)}
							<li>
								<a href={link.href}>
									{link.label}
									<Icon name="arrow" size={15} />
								</a>
							</li>
						{/each}
						<li>
							<a href="/">Back to the invitation<Icon name="arrow" size={15} /></a>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.next-section {
		padding-top: 0;
	}

	.band {
		display: grid;
		gap: 1.15rem;
		padding-top: clamp(2rem, 4vw, 3rem);
		border-top: 1px solid var(--line);
	}

	.label {
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--amber-deep);
	}

	.primary {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: clamp(1.5rem, 3vw, 2rem);
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		text-decoration: none;
		box-shadow: var(--shadow-sm);
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease;
	}

	.primary:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.title {
		font-family: var(--font-display);
		font-size: clamp(1.35rem, 2.6vw, 1.75rem);
		font-weight: 600;
		font-variation-settings: 'opsz' 32;
		line-height: 1.2;
	}

	.blurb {
		font-size: 0.9375rem;
		color: var(--ink-soft);
	}

	.go {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		margin-top: 0.85rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--teal);
	}

	.primary:hover .go :global(svg) {
		transform: translateX(3px);
	}

	.go :global(svg) {
		transition: transform 0.18s ease;
	}

	.others {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: clamp(1.25rem, 3vw, 2rem) 0;
	}

	.others ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.others a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.65rem 0;
		border-bottom: 1px solid var(--line);
		font-weight: 500;
		text-decoration: none;
		color: var(--ink-soft);
		transition: color 0.15s ease;
	}

	.others a:hover {
		color: var(--ink);
	}

	@media (min-width: 800px) {
		.band {
			grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
			gap: 2.5rem;
			align-items: start;
		}
	}
</style>
