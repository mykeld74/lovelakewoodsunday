<script lang="ts">
	import { event, venue, media } from '$lib/config/site';
	import Ridges from './Ridges.svelte';

	const facts = [
		{ label: 'When', value: event.dateLabel, sub: `${event.timeLabel} · ${event.durationLabel}` },
		{ label: 'Where', value: `${venue.name} ${venue.room}`, sub: `${venue.city}, ${venue.state}` },
		{ label: 'Cost', value: 'Free', sub: 'No registration, no offering' }
	];
</script>

<section class="hero" class:with-art={!!media.eventGraphic}>
	<div class="glow" aria-hidden="true"></div>

	<div class="container inner">
		<div class="copy">
			<p class="kicker">
				<span class="dot" aria-hidden="true"></span>
				Lakewood, Colorado · {event.dateShort}
			</p>

			<h1 class="display">Love Lakewood Sunday</h1>

			<p class="tagline">
				<span>One Sunday.</span>
				<span>One Church.</span>
				<span>One City.</span>
			</p>

			<p class="lede">
				Lakewood churches are coming together for one unforgettable morning of worship, hope, and
				community. Whether church is already part of your life, you haven’t attended in years, or
				you’ve never attended at all — you are invited.
			</p>

			<div class="btn-row cta">
				<a href="#visit" class="btn btn-lg">Plan your visit</a>
				<a href="#invite" class="btn btn-lg btn-outline">Invite someone</a>
			</div>
		</div>

		{#if media.eventGraphic}
			<div class="art">
				<img src={media.eventGraphic} alt="Love Lakewood Sunday event graphic" />
			</div>
		{/if}
	</div>

	<div class="container">
		<ul class="facts">
			{#each facts as fact (fact.label)}
				<li>
					<span class="fact-label">{fact.label}</span>
					<span class="fact-value">{fact.value}</span>
					<span class="fact-sub">{fact.sub}</span>
				</li>
			{/each}
		</ul>
	</div>

	<Ridges into="var(--cream)" />
</section>

<style>
	.hero {
		position: relative;
		padding-top: clamp(2.5rem, 7vw, 5rem);
		background: linear-gradient(180deg, var(--sand) 0%, var(--cream) 62%), var(--cream);
		overflow: hidden;
	}

	/* Low sun coming up behind the headline. */
	.glow {
		position: absolute;
		top: -34vw;
		left: 50%;
		width: min(120rem, 160vw);
		aspect-ratio: 1;
		transform: translateX(-50%);
		background: radial-gradient(
			circle at center,
			rgb(251 219 164 / 0.85) 0%,
			rgb(251 219 164 / 0.35) 34%,
			rgb(251 219 164 / 0) 62%
		);
		pointer-events: none;
	}

	.inner {
		position: relative;
		display: grid;
		gap: clamp(2.5rem, 5vw, 4rem);
		align-items: center;
	}

	.copy {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.15rem;
	}

	.kicker {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.4rem 0.95rem 0.4rem 0.7rem;
		background: rgb(255 255 255 / 0.7);
		border: 1px solid var(--line);
		border-radius: var(--radius-pill);
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--amber);
		box-shadow: 0 0 0 3px rgb(227 155 46 / 0.22);
	}

	h1 {
		max-width: 14ch;
	}

	.tagline {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.25rem 1.5rem;
		font-family: var(--font-display);
		font-size: clamp(1.0625rem, 2.2vw, 1.4rem);
		font-variation-settings: 'opsz' 20;
		font-style: italic;
		color: var(--teal);
	}

	.tagline span {
		position: relative;
	}

	.tagline span + span::before {
		content: '';
		position: absolute;
		left: -0.85rem;
		top: 50%;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--amber);
		transform: translateY(-50%);
	}

	.lede {
		max-width: 40rem;
	}

	.cta {
		justify-content: center;
		margin-top: 0.6rem;
	}

	.art img {
		width: 100%;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		border: 1px solid var(--line);
	}

	.facts {
		position: relative;
		list-style: none;
		padding: 0;
		margin-top: clamp(3rem, 6vw, 4.5rem);
		display: grid;
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.facts li {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 1.35rem 1.5rem;
		background: var(--paper);
	}

	.fact-label {
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--amber-deep);
	}

	.fact-value {
		font-family: var(--font-display);
		font-size: 1.1875rem;
		font-weight: 600;
		font-variation-settings: 'opsz' 24;
		line-height: 1.25;
	}

	.fact-sub {
		font-size: 0.9375rem;
		color: var(--ink-soft);
	}

	@media (min-width: 640px) {
		.facts {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 960px) {
		.with-art .inner {
			grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
		}

		.with-art .copy {
			align-items: start;
			text-align: left;
		}

		.with-art .tagline {
			justify-content: flex-start;
		}

		.with-art .cta {
			justify-content: flex-start;
		}
	}
</style>
