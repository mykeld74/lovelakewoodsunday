<script lang="ts">
	import Icon from './Icon.svelte';
</script>

<section id="kids" class="section">
	<div class="container">
		<div class="pair">
			<article class="panel kids">
				<span class="badge"><Icon name="child" size={22} /></span>
				<h2 class="h3">Bringing kids? Please do.</h2>
				<p>
					Children are absolutely welcome — including the wiggly ones and the loud ones. Kids stay
					with their parents for the whole service, so there is no check-in line and no dropping
					anyone off with a stranger.
				</p>
				<ul class="points">
					<li>
						<Icon name="check" size={17} />
						<span>A special children’s moment during the service</span>
					</li>
					<li>
						<Icon name="check" size={17} />
						<span>An activity bag for every child to keep them busy</span>
					</li>
					<li>
						<Icon name="check" size={17} />
						<span>Nobody minds the noise. Truly.</span>
					</li>
				</ul>
			</article>

			<article class="panel wear">
				<span class="badge"><Icon name="shirt" size={22} /></span>
				<h2 class="h3">Come as you are.</h2>
				<p>
					There is no dress code. Feel free to dress casually — there will be people in shorts and
					T-shirts, others in jeans, and probably a few in suits. Wear whatever you would wear on a
					normal Sunday morning.
				</p>
				<div class="wear-row" aria-hidden="true">
					<span>shorts &amp; tees</span>
					<span>jeans</span>
					<span>sundresses</span>
					<span>flannel</span>
					<span>a suit, if you want</span>
				</div>
				<p class="closer">The goal is that everyone in the room feels comfortable.</p>
			</article>
		</div>
	</div>
</section>

<style>
	.pair {
		display: grid;
		gap: clamp(1.25rem, 2.5vw, 1.75rem);
	}

	.panel {
		border-radius: var(--radius-lg);
		padding: clamp(1.75rem, 3.5vw, 2.5rem);
		border: 1px solid var(--line);
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.kids {
		background: linear-gradient(160deg, #fdf3e2, #fbf8f2);
	}

	.wear {
		background: linear-gradient(160deg, #eaf1f1, #fbf8f2);
	}

	.badge {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius);
		background: var(--paper);
		border: 1px solid var(--line);
		color: var(--clay);
		box-shadow: var(--shadow-sm);
	}

	.wear .badge {
		color: var(--teal);
	}

	.panel p {
		color: var(--ink-soft);
	}

	.points {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		margin-top: 0.15rem;
	}

	.points li {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		font-size: 0.9875rem;
	}

	.points :global(svg) {
		flex-shrink: 0;
		margin-top: 0.28rem;
		color: var(--amber-deep);
	}

	.wear-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.wear-row span {
		padding: 0.35rem 0.8rem;
		border-radius: var(--radius-pill);
		background: rgb(255 255 255 / 0.75);
		border: 1px solid var(--line);
		font-size: 0.875rem;
		color: var(--ink-soft);
	}

	.closer {
		font-family: var(--font-display);
		font-size: 1.0625rem;
		font-style: italic;
		font-variation-settings: 'opsz' 20;
		color: var(--teal);
	}

	@media (min-width: 800px) {
		.pair {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
