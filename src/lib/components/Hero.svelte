<script lang="ts">
	import { event, venue, site } from '$lib/config/site';
	import Ridges from './Ridges.svelte';
	import HeartMark from './HeartMark.svelte';
	import worship from '$lib/assets/hero/worship.webp';
	import prayer from '$lib/assets/hero/prayer.webp';
	import hug from '$lib/assets/hero/hug.webp';
	import preaching from '$lib/assets/hero/preaching.webp';

	const meta = [`${venue.name} Gym`, 'September 20', event.timeLabel.replace(' a.m.', ' am')];

	const tiles = [
		{ id: 'worship', src: worship },
		{ id: 'prayer', src: prayer },
		{ id: 'hug', src: hug },
		{ id: 'preaching', src: preaching }
	] as const;
</script>

<section class="hero">
	<div class="stage">
		<div class="copy">
			<span class="heart" aria-hidden="true">
				<HeartMark size={58} />
			</span>

			<h1 class="title">
				<span>Love</span>
				<span>Lakewood</span>
				<span class="sunday">Sunday</span>
			</h1>

			<p class="tagline">{site.tagline}</p>
			<p class="lede">A unified community church service for all of Lakewood.</p>

			<ul class="meta">
				{#each meta as line (line)}
					<li>{line}</li>
				{/each}
			</ul>

			<div class="cta">
				<a href="/visit" class="btn btn-lg">Plan your visit</a>
				<a href="#invite" class="btn btn-lg btn-outline">Invite someone</a>
			</div>
		</div>

		<div class="collage" aria-hidden="true">
			{#each tiles as tile (tile.id)}
				<img
					class={tile.id}
					src={tile.src}
					alt=""
					decoding="async"
					fetchpriority={tile.id === 'worship' ? 'high' : 'auto'}
				/>
			{/each}
		</div>

		<aside class="sticky" aria-hidden="true">
			<svg class="tape" viewBox="0 0 100 22" aria-hidden="true">
				<!-- Straight top/bottom; only the short left/right ends are torn. -->
				<path
					d="M8 3
						H92
						L94.5 5.2 91.8 7.4 95.2 9.8 92.1 12.1 95 14.5 91.6 16.8 94.3 19
						H8
						L5.2 16.6 8.1 14.3 4.6 11.9 7.8 9.6 4.9 7.2 7.5 4.9 Z"
				/>
			</svg>
			<p>Love God.<br />Love People.<br />Love Lakewood.</p>
			<span class="sticky-heart">
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M12 20s-7.5-4.6-7.5-9.5a4.2 4.2 0 0 1 7.5-2.6 4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"
					/>
				</svg>
			</span>
		</aside>
	</div>

	<Ridges into="var(--cream)" back="#DFDBD0" mid="#BFBFB4" />
</section>

<style>
	@font-face {
		font-family: 'Caveat';
		font-style: normal;
		font-weight: 500;
		font-display: swap;
		src: url('/fonts/caveat-500.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Caveat';
		font-style: normal;
		font-weight: 600;
		font-display: swap;
		src: url('/fonts/caveat-600.woff2') format('woff2');
	}

	.hero {
		/* Moss from the event graphic — a touch warmer than --deep. */
		--hero-ink: #3f4b3d;
		position: relative;
		display: flex;
		flex-direction: column;
		max-height: 70vh;
		background: #f7f0e6;
		overflow: clip;
	}

	.stage {
		position: relative;
		display: grid;
		gap: 0;
		align-items: stretch;
		flex: 1 1 auto;
		min-height: 0;
	}

	.hero :global(.ridges) {
		flex-shrink: 0;
		height: clamp(56px, 7vw, 100px);
	}

	.copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 0.75rem;
		padding: clamp(1.75rem, 4vw, 2.75rem) var(--gutter);
		padding-bottom: clamp(2rem, 4vw, 2.75rem);
	}

	.heart {
		display: grid;
		place-items: center;
		width: 3.6rem;
		height: 3.6rem;
		color: var(--clay);
		margin: 0.55rem 0 -0.65rem -0.95rem;
		transform: rotate(-10deg);
		animation: heart-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.heart :global(svg) {
		width: 100%;
		height: 100%;
	}

	.title {
		display: flex;
		flex-direction: column;
		font-family: var(--font-body);
		font-size: clamp(2.5rem, 7vw, 4.1rem);
		font-weight: 800;
		line-height: 0.92;
		letter-spacing: -0.04em;
		color: var(--hero-ink);
		text-wrap: balance;
		animation: rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
	}

	.sunday {
		position: relative;
		display: inline-block;
		width: fit-content;
	}

	.sunday::after {
		content: '';
		position: absolute;
		left: 0;
		right: 8%;
		bottom: 0.02em;
		height: 0.12em;
		background: var(--clay);
		border-radius: 2px;
		opacity: 0.9;
		transform: rotate(-0.6deg);
		/* Soft hand-drawn edge */
		-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 8' preserveAspectRatio='none'%3E%3Cpath d='M0 4.2c8-2 16 2 24 0s16-2 24 0 16 2 24 0 16-2 24 0 16 2 24 0' stroke='%23000' stroke-width='5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
		mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 8' preserveAspectRatio='none'%3E%3Cpath d='M0 4.2c8-2 16 2 24 0s16-2 24 0 16 2 24 0 16-2 24 0 16 2 24 0' stroke='%23000' stroke-width='5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
	}

	.tagline {
		font-family: var(--font-body);
		font-size: clamp(1.05rem, 2vw, 1.35rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--hero-ink);
		margin-top: 0.35rem;
		animation: rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
	}

	.lede {
		font-size: clamp(0.95rem, 1.5vw, 1.0625rem);
		color: var(--ink-soft);
		max-width: 28rem;
		animation: rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
	}

	.meta {
		list-style: none;
		padding: 0;
		margin: 0.35rem 0 0;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		font-family: var(--font-body);
		font-size: clamp(1.05rem, 1.8vw, 1.25rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--clay);
		animation: rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.24s both;
	}

	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.85rem;
		animation: rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
	}

	.collage {
		position: relative;
		display: grid;
		/* Brick layout: wide/narrow on top, narrow/wide below — equal row heights. */
		grid-template-columns: 1.35fr 1fr 1.35fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			'worship worship prayer'
			'hug preaching preaching';
		gap: 3px;
		min-height: 16rem;
		background: #fff;
		transform: translateY(-2vw);
		animation: fade-in 0.9s ease 0.1s both;
	}

	.collage img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.collage .worship {
		grid-area: worship;
		object-position: 50% 35%;
	}

	.collage .prayer {
		grid-area: prayer;
		object-position: 50% 30%;
	}

	.collage .hug {
		grid-area: hug;
		/* Keep faces in the upper half so the wave can lap the bottom. */
		object-position: 50% 28%;
	}

	.collage .preaching {
		grid-area: preaching;
		object-position: 48% 22%;
	}

	.sticky {
		position: absolute;
		z-index: 2;
		left: 50%;
		top: 58%;
		width: min(14rem, 48vw);
		aspect-ratio: 1;
		padding: 1.5rem 1.15rem 1.25rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;
		background: #f3ebe0;
		box-shadow:
			0 1px 1px rgb(22 38 46 / 0.06),
			0 10px 28px rgb(22 38 46 / 0.14);
		transform: translate(-50%, -50%) rotate(-3.5deg);
		animation: sticky-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
	}

	.tape {
		position: absolute;
		top: -0.35rem;
		left: 50%;
		width: 3.4rem;
		height: auto;
		transform: translateX(-50%) rotate(-1deg);
		filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.22));
		overflow: visible;
	}

	.tape path {
		fill: rgb(70 74 72 / 0.78);
	}

	.sticky p {
		font-family: Caveat, 'Segoe Print', 'Bradley Hand', cursive;
		font-size: clamp(1.55rem, 2.8vw, 1.95rem);
		font-weight: 600;
		line-height: 1.15;
		text-align: center;
		color: #3a2f28;
	}

	.sticky-heart {
		display: grid;
		place-items: center;
		width: 1.35rem;
		height: 1.15rem;
		color: var(--clay);
	}

	.sticky-heart svg {
		width: 100%;
		height: 100%;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(0.7rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes heart-in {
		from {
			opacity: 0;
			transform: rotate(-10deg) scale(0.7);
		}
		to {
			opacity: 1;
			transform: rotate(-10deg) scale(1);
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes sticky-in {
		from {
			opacity: 0;
			transform: translate(-50%, -42%) rotate(-8deg);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) rotate(-3.5deg);
		}
	}

	@keyframes sticky-in-mobile {
		from {
			opacity: 0;
			transform: translateY(0.6rem) rotate(-8deg);
		}
		to {
			opacity: 1;
			transform: rotate(-3.5deg);
		}
	}

	@media (min-width: 860px) {
		.stage {
			grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
		}

		.copy {
			/* Center the block in the left column; keep lines left-aligned. */
			display: grid;
			grid-template-columns: max-content;
			justify-content: center;
			align-content: center;
			justify-items: start;
			padding: clamp(1.75rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem);
		}

		.collage {
			min-height: 100%;
			height: 100%;
		}

		/* Wave laps the bottom of the photos, as in the reference. */
		.hero :global(.ridges) {
			margin-top: clamp(-3rem, -5.5vw, -4.25rem);
			height: clamp(64px, 8vw, 110px);
		}

		.sticky {
			left: 46%;
			top: 50%;
			width: min(13.5rem, 18vw);
		}
	}

	@media (max-width: 859px) {
		.hero {
			max-height: none;
		}

		.copy {
			padding-top: clamp(1.75rem, 5vw, 2.5rem);
		}

		.sticky {
			top: auto;
			bottom: 1.25rem;
			left: 1.25rem;
			transform: rotate(-3.5deg);
			width: min(11.5rem, 42vw);
			animation-name: sticky-in-mobile;
		}

		.collage {
			min-height: 18rem;
		}

		.hero :global(.ridges) {
			margin-top: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.heart,
		.title,
		.tagline,
		.lede,
		.meta,
		.cta,
		.collage,
		.sticky {
			animation: none;
		}
	}
</style>
