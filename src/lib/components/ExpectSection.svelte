<script lang="ts">
	import { serviceMoments } from '$lib/data/volunteer';
	import { event } from '$lib/config/site';
	import Icon from './Icon.svelte';

	const icons: Record<string, string> = {
		music: 'music',
		prayer: 'hands',
		children: 'child',
		message: 'speech',
		communion: 'cup'
	};
</script>

<section id="expect" class="section surface-deep">
	<div class="container">
		<div class="layout">
			<div class="intro">
				<p class="eyebrow">What the morning is like</p>
				<h2 class="h2">One hour. Nothing you have to figure out in advance.</h2>
				<p class="lede">
					The service is meant to be genuinely meaningful if you have been in church your whole life
					— and completely comfortable if you are just checking it out.
				</p>

				<ul class="assurances">
					<li><Icon name="clock" size={18} /> {event.durationLabel}</li>
					<li><Icon name="check" size={18} /> No registration, no name tags</li>
					<li><Icon name="check" size={18} /> No offering will be taken</li>
					<li><Icon name="check" size={18} /> You will never be singled out</li>
				</ul>
			</div>

			<ol class="timeline">
				{#each serviceMoments as moment, i (moment.id)}
					<li>
						<span class="marker">
							<Icon name={icons[moment.id] ?? 'sparkle'} size={19} />
						</span>
						<div class="body">
							<h3 class="h3">
								<span class="num">{String(i + 1).padStart(2, '0')}</span>
								{moment.title}
							</h3>
							<p>{moment.description}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	section {
		background:
			radial-gradient(120% 80% at 12% 0%, rgb(44 110 127 / 0.35), transparent 60%), var(--deep);
	}

	.layout {
		display: grid;
		gap: clamp(2.5rem, 5vw, 4.5rem);
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.assurances {
		list-style: none;
		padding: 0;
		margin-top: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.assurances li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.9375rem;
		font-weight: 500;
		color: rgb(252 248 242 / 0.86);
	}

	.assurances :global(svg) {
		color: var(--amber);
		flex-shrink: 0;
	}

	.timeline {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.timeline li {
		position: relative;
		display: grid;
		grid-template-columns: 2.75rem minmax(0, 1fr);
		gap: 1.15rem;
		padding-bottom: 1.75rem;
	}

	.timeline li:last-child {
		padding-bottom: 0;
	}

	/* Connecting thread down the markers. */
	.timeline li:not(:last-child)::before {
		content: '';
		position: absolute;
		left: 1.375rem;
		top: 2.9rem;
		bottom: 0.35rem;
		width: 1.5px;
		background: linear-gradient(180deg, rgb(227 155 46 / 0.5), rgb(255 255 255 / 0.08));
	}

	.marker {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: rgb(255 255 255 / 0.07);
		border: 1.5px solid rgb(227 155 46 / 0.45);
		color: var(--amber);
	}

	.body h3 {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-top: 0.35rem;
		color: var(--cream);
	}

	.num {
		font-family: var(--font-body);
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--amber);
	}

	.body p {
		margin-top: 0.4rem;
		color: rgb(252 248 242 / 0.7);
		font-size: 0.9875rem;
		max-width: 38rem;
	}

	@media (min-width: 960px) {
		.layout {
			grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
			align-items: start;
		}

		.intro {
			position: sticky;
			top: 6.5rem;
		}
	}
</style>
