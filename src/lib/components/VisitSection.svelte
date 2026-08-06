<script lang="ts">
	import { event, venue, maps, addressLine, media } from '$lib/config/site';
	import SectionHead from './SectionHead.svelte';
	import Icon from './Icon.svelte';

	/** 1 when this section leads its own page, so each page has one <h1>. */
	let { level = 2 }: { level?: 1 | 2 } = $props();
</script>

<section id="visit" class="section surface-sand">
	<div class="container">
		<SectionHead
			eyebrow="Plan your visit"
			title="Everything you need for Sunday morning"
			lede="No surprises, no insider knowledge required. Here is exactly where to go, where to park, and what to expect when you walk up."
			{level}
		/>

		<div class="grid">
			<div class="map-col">
				<div class="map-frame">
					<!--
						`loading="lazy"` still needs no interaction — it only holds the
						request back while the frame is well below the viewport, which
						helps on phones. The written directions underneath stand on
						their own if the embed is ever blocked.
					-->
					<iframe
						src={maps.embed}
						title="Map showing {venue.name}, {addressLine}"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						allowfullscreen
					></iframe>
				</div>

				<div class="address-bar">
					<div>
						<p class="venue-name">{venue.name} — {venue.room}</p>
						<p class="muted">{addressLine}</p>
					</div>
					<div class="btn-row">
						<a class="btn" href={maps.google} target="_blank" rel="noopener noreferrer">
							<Icon name="car" size={18} />
							Driving directions
						</a>
						<a class="btn btn-outline" href={maps.apple} target="_blank" rel="noopener noreferrer">
							Apple Maps
						</a>
					</div>
				</div>
			</div>

			<ul class="details">
				<li class="card detail">
					<span class="detail-icon"><Icon name="car" /></span>
					<div>
						<h3 class="h3">Parking</h3>
						<p>{venue.parking}</p>
						{#if media.parkingMap}
							<a class="inline-link" href={media.parkingMap} target="_blank" rel="noopener">
								See the parking map
								<Icon name="arrow" size={16} />
							</a>
						{/if}
					</div>
				</li>

				<li class="card detail">
					<span class="detail-icon"><Icon name="accessible" /></span>
					<div>
						<h3 class="h3">Accessibility</h3>
						<p>{venue.accessibility}</p>
					</div>
				</li>

				<li class="card detail">
					<span class="detail-icon"><Icon name="clock" /></span>
					<div>
						<h3 class="h3">When to arrive</h3>
						<p>{event.arriveBy}</p>
					</div>
				</li>

				<li class="card detail">
					<span class="detail-icon"><Icon name="calendar" /></span>
					<div>
						<h3 class="h3">Don’t forget</h3>
						<!-- timeLabel already ends in a period ("10:00 a.m."), so it is
						     separated with a middot rather than a second full stop. -->
						<p>
							{event.dateLabel} at {event.timeLabel} · {event.durationLabel}. {event.cost}
						</p>
						<a class="inline-link" href="/event.ics" download>
							Add to your calendar
							<Icon name="arrow" size={16} />
						</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		gap: clamp(1.5rem, 3vw, 2.25rem);
		margin-top: clamp(2.25rem, 4vw, 3.25rem);
	}

	.map-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.map-frame {
		position: relative;
		aspect-ratio: 4 / 3;
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--line-strong);
		box-shadow: var(--shadow-md);
		background: var(--sand-deep);
	}

	.map-frame iframe {
		width: 100%;
		height: 100%;
		border: 0;
	}

	.address-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.15rem 1.35rem;
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	.venue-name {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 600;
		font-variation-settings: 'opsz' 24;
	}

	.address-bar .btn {
		padding: 0.65rem 1.15rem;
		font-size: 0.9375rem;
	}

	.details {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 1rem;
		align-content: start;
	}

	.detail {
		display: flex;
		gap: 1rem;
		padding: 1.35rem 1.5rem;
	}

	.detail h3 {
		margin-bottom: 0.3rem;
	}

	.detail p {
		color: var(--ink-soft);
		font-size: 0.9875rem;
	}

	.detail-icon {
		flex-shrink: 0;
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius);
		background: var(--sand);
		color: var(--teal);
	}

	.inline-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		margin-top: 0.6rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--teal);
		text-decoration: none;
		border-bottom: 1.5px solid color-mix(in srgb, var(--teal) 35%, transparent);
		padding-bottom: 1px;
	}

	.inline-link:hover {
		border-bottom-color: var(--teal);
	}

	@media (min-width: 640px) {
		.details {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
			align-items: start;
		}

		.details {
			grid-template-columns: 1fr;
		}
	}
</style>
