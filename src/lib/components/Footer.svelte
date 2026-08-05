<script lang="ts">
	import { event, venue, addressLine, site } from '$lib/config/site';
	import { churches } from '$lib/data/churches';
	import Wordmark from './Wordmark.svelte';
</script>

<footer class="footer">
	<div class="container">
		<div class="top">
			<div class="brand-col">
				<Wordmark size="lg" tagline />
				<p class="blurb">
					A shared morning hosted by churches who love this city. Everyone in Lakewood is invited —
					no exceptions, no strings.
				</p>
			</div>

			<div class="cols">
				<div class="col">
					<h2>The morning</h2>
					<ul>
						<li><a href="/#visit">Plan your visit</a></li>
						<li><a href="/#expect">What to expect</a></li>
						<li><a href="/#kids">Kids &amp; what to wear</a></li>
						<li><a href="/#faq">Questions</a></li>
					</ul>
				</div>

				<div class="col">
					<h2>Get involved</h2>
					<ul>
						<li><a href="/volunteer">Serve at the event</a></li>
						<li><a href="/#invite">Invite someone</a></li>
						<li><a href="/share">Share kit for churches</a></li>
						<li><a href="/#contact">Ask a question</a></li>
					</ul>
				</div>

				<div class="col">
					<h2>Where &amp; when</h2>
					<address>
						{event.dateLabel}<br />
						{event.timeLabel}<br />
						<span class="venue">{venue.name} {venue.room}</span><br />
						{addressLine}
					</address>
				</div>
			</div>
		</div>

		<div class="churches">
			<h2>Hosted together by</h2>
			<ul>
				{#each churches as church (church.id)}
					<li>
						{#if church.url}
							<a href={church.url} target="_blank" rel="noopener noreferrer">{church.name}</a>
						{:else}
							<span>{church.name}</span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<div class="bottom">
			<p>&copy; {new Date().getFullYear()} {site.name}</p>
			<p>
				Questions? <a href="/#contact">Send us a note</a> — a real person will get back to you.
			</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--deep-2);
		color: rgb(252 248 242 / 0.78);
		padding-block: clamp(3rem, 6vw, 4.5rem) 2rem;
		font-size: 0.9375rem;
	}

	.top {
		display: grid;
		gap: 2.75rem;
	}

	.brand-col {
		color: var(--cream);
		max-width: 24rem;
	}

	.blurb {
		margin-top: 1rem;
		color: rgb(252 248 242 / 0.68);
		line-height: 1.6;
	}

	.cols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
		gap: 2rem;
	}

	h2 {
		font-family: var(--font-body);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--amber);
		margin-bottom: 0.9rem;
	}

	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	a {
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}

	a:hover {
		color: var(--cream);
		border-bottom-color: var(--amber);
	}

	address {
		font-style: normal;
		line-height: 1.7;
	}

	.venue {
		color: var(--cream);
	}

	.churches {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--line-dark);
	}

	.churches ul {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5rem 1.75rem;
	}

	.bottom {
		margin-top: 2.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line-dark);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 1.5rem;
		font-size: 0.875rem;
		color: rgb(252 248 242 / 0.58);
	}

	@media (min-width: 800px) {
		.top {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
			gap: 4rem;
		}
	}
</style>
