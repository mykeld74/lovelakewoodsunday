<script lang="ts">
	import { event, venue, maps, addressLine, media } from '$lib/config/site';
	import SectionHead from './SectionHead.svelte';
	import Icon from './Icon.svelte';

	/**
	 * The map iframe is only mounted after a click. It keeps Google's cookies
	 * and ~700KB of scripts off the page for everyone who never opens the map,
	 * and the written directions below work with or without it.
	 */
	let mapLoaded = $state(false);
</script>

<section id="visit" class="section surface-sand">
	<div class="container">
		<SectionHead
			eyebrow="Plan your visit"
			title="Everything you need for Sunday morning"
			lede="No surprises, no insider knowledge required. Here is exactly where to go, where to park, and what to expect when you walk up."
		/>

		<div class="grid">
			<div class="map-col">
				<div class="map-frame">
					{#if mapLoaded}
						<iframe
							src={maps.embed}
							title="Map showing {venue.name}, {addressLine}"
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							allowfullscreen
						></iframe>
					{:else}
						<button type="button" class="map-placeholder" onclick={() => (mapLoaded = true)}>
							<span class="map-grid" aria-hidden="true"></span>
							<span class="map-pin" aria-hidden="true">
								<Icon name="pin" size={26} />
							</span>
							<span class="map-cta">
								<span class="map-cta-title">Show the map</span>
								<span class="map-cta-sub">Loads Google Maps</span>
							</span>
						</button>
					{/if}
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
						<p>
							{event.dateLabel} at {event.timeLabel}. {event.durationLabel}. {event.cost}
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

	.map-placeholder {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.85rem;
		background: linear-gradient(150deg, #eae2d3, #dfe7e4);
		border: 0;
		cursor: pointer;
		padding: 1.5rem;
	}

	/* Suggestion of streets, so the placeholder reads as a map. */
	.map-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--line-strong) 1px, transparent 1px),
			linear-gradient(90deg, var(--line-strong) 1px, transparent 1px);
		background-size: 46px 46px;
		opacity: 0.45;
	}

	.map-pin {
		position: relative;
		display: grid;
		place-items: center;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 50%;
		background: var(--clay);
		color: #fff;
		box-shadow: 0 6px 18px rgb(194 90 60 / 0.35);
	}

	.map-cta {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
	}

	.map-cta-title {
		font-family: var(--font-display);
		font-size: 1.1875rem;
		font-weight: 600;
		font-variation-settings: 'opsz' 24;
	}

	.map-cta-sub {
		font-size: 0.875rem;
		color: var(--ink-soft);
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
