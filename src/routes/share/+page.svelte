<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import CopyBlock from '$lib/components/CopyBlock.svelte';
	import { site, event, venue, addressLine, invitation, media } from '$lib/config/site';

	const link = `${site.url}/invite`;

	const samples = [
		{
			label: 'Text message',
			text: `${invitation.sms}${site.url}`
		},
		{
			label: 'Social post',
			text: `${invitation.short}\n\n${event.dateLabel} · ${event.timeLabel}\n${venue.name} ${venue.room}, ${venue.city}\n\nAll the details: ${site.url}`
		},
		{
			label: 'Bulletin / slide announcement',
			text: `LOVE LAKEWOOD SUNDAY\nOne Sunday. One Church. One City.\n\n${event.dateLabel} at ${event.timeLabel}\n${venue.name} ${venue.room}\n${addressLine}\n\nChurches from across Lakewood are gathering for one service. About an hour. Free. No offering will be taken. Everyone is welcome — bring a friend, a neighbor, anyone.\n\n${site.url}`
		},
		{
			label: 'Email invitation',
			text: `Subject: ${invitation.subject}\n\n${invitation.email}${site.url}`
		}
	];
</script>

<Seo
	title="Share kit"
	description="Everything participating churches need to invite their people to Love Lakewood Sunday — links, QR codes, and ready-to-use wording."
	index={false}
/>

<section class="hero">
	<div class="container">
		<a class="back" href="/">
			<Icon name="arrow" size={16} class="flip" />
			Back to the event
		</a>
		<p class="eyebrow">For participating churches</p>
		<h1 class="h2">Share kit</h1>
		<p class="lede">
			Everything you need to get the word out — one link, a QR code, and wording you can paste
			straight into a text, a bulletin, or a slide. Grab whatever helps.
		</p>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="split">
			<div class="col">
				<h2 class="h3">The invitation link</h2>
				<p class="muted">
					Every link below lands on the same page, so whoever you send it to gets the same honest
					answers about parking, kids, what to wear, and what the hour will be like.
				</p>
				<ShareButtons source="sharekit" compact />

				<div class="short-link">
					<span class="short-label">Short link for print &amp; pulpit</span>
					<code>{link.replace(/^https?:\/\//, '')}</code>
				</div>
			</div>

			<div class="col qr-col">
				<h2 class="h3">QR code</h2>
				<p class="muted">
					For slides, flyers, and the back of a business card. The SVG stays sharp at any size — use
					it for anything printed.
				</p>
				<div class="qr-card">
					<img src="/qr.svg?source=qr" alt="QR code linking to lovelakewoodsunday.org" />
					<div class="btn-row">
						<a class="btn btn-outline" href="/qr.svg?source=print" download>Download SVG</a>
						<a class="btn btn-outline" href="/qr.png?source=print&size=1600" download>
							Download PNG
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section surface-sand">
	<div class="container">
		<div class="head">
			<h2 class="h2">Ready-to-use wording</h2>
			<p class="lede">
				Written to sound like a person, not a promotion. Edit freely — but the tone matters more
				than the words: warm, specific, and no pressure.
			</p>
		</div>

		<div class="samples">
			{#each samples as sample (sample.label)}
				<CopyBlock label={sample.label} text={sample.text} />
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="head">
			<h2 class="h2">Artwork &amp; details</h2>
		</div>

		<div class="assets">
			<div class="asset card">
				<span class="asset-icon"><Icon name="calendar" /></span>
				<h3 class="h3">The facts</h3>
				<dl>
					<div>
						<dt>What</dt>
						<dd>{site.name} — {site.tagline}</dd>
					</div>
					<div>
						<dt>When</dt>
						<dd>{event.dateLabel}, {event.timeLabel}</dd>
					</div>
					<div>
						<dt>How long</dt>
						<dd>{event.durationLabel}</dd>
					</div>
					<div>
						<dt>Where</dt>
						<dd>{venue.name} {venue.room}<br />{addressLine}</dd>
					</div>
					<div>
						<dt>Cost</dt>
						<dd>{event.cost}</dd>
					</div>
				</dl>
			</div>

			<div class="asset card">
				<span class="asset-icon"><Icon name="sparkle" /></span>
				<h3 class="h3">The shared graphic</h3>
				{#if media.eventGraphic}
					<img class="graphic" src={media.eventGraphic} alt="Love Lakewood Sunday event graphic" />
					<a class="btn btn-outline" href={media.eventGraphic} download>Download the graphic</a>
				{:else}
					<p class="muted">
						The graphic every participating church is using will be posted here as soon as it is
						finalized, in sizes for social, print, and slides.
					</p>
				{/if}
			</div>

			<div class="asset card">
				<span class="asset-icon"><Icon name="heart" /></span>
				<h3 class="h3">A note on tone</h3>
				<p class="muted">
					The people we most want in that gym are the ones who feel least sure about walking in.
					When you share this, lead with the invitation, not the event. “Come with me” does more
					than any flyer.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		background: linear-gradient(180deg, var(--sand), var(--cream));
		padding-block: clamp(2.25rem, 5vw, 3.5rem) clamp(2rem, 4vw, 3rem);
		border-bottom: 1px solid var(--line);
	}

	.hero .container {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		max-width: 46rem;
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		align-self: flex-start;
		margin-bottom: 0.5rem;
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--ink-soft);
		text-decoration: none;
	}

	.back:hover {
		color: var(--ink);
	}

	.back :global(.flip) {
		transform: rotate(180deg);
	}

	.split {
		display: grid;
		gap: clamp(2rem, 4vw, 3.5rem);
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		align-items: flex-start;
		min-width: 0;
	}

	.col .muted {
		font-size: 0.9875rem;
		max-width: 32rem;
	}

	.col :global(.share) {
		width: 100%;
		margin-top: 0.35rem;
	}

	.short-link {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		margin-top: 0.5rem;
		padding: 0.9rem 1.25rem;
		background: var(--sand);
		border: 1px dashed var(--line-strong);
		border-radius: var(--radius);
	}

	.short-label {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	code {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 600;
		font-variation-settings: 'opsz' 24;
		color: var(--teal);
	}

	.qr-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		margin-top: 0.35rem;
	}

	.qr-card img {
		width: min(15rem, 100%);
		border-radius: var(--radius);
		border: 1px solid var(--line);
		box-shadow: var(--shadow-sm);
	}

	.head {
		max-width: 44rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: clamp(1.75rem, 3.5vw, 2.5rem);
	}

	.samples {
		display: grid;
		gap: 1.15rem;
	}

	.assets {
		display: grid;
		gap: 1.15rem;
	}

	.asset {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.asset-icon {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: var(--radius);
		background: var(--sand);
		color: var(--teal);
	}

	.asset dl {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin: 0;
		width: 100%;
	}

	.asset dl > div {
		display: grid;
		grid-template-columns: 5.5rem 1fr;
		gap: 0.75rem;
		font-size: 0.9375rem;
	}

	dt {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-faint);
		padding-top: 0.15rem;
	}

	dd {
		margin: 0;
		line-height: 1.5;
	}

	.graphic {
		width: 100%;
		border-radius: var(--radius);
		border: 1px solid var(--line);
	}

	@media (min-width: 800px) {
		.split {
			grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		}

		.samples {
			grid-template-columns: 1fr 1fr;
		}

		.assets {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
