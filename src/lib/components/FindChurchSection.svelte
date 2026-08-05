<script lang="ts">
	import { churches } from '$lib/data/churches';
	import ChurchLogo from './ChurchLogo.svelte';
	import Icon from './Icon.svelte';
</script>

<section id="find-a-church" class="section surface-deep">
	<div class="container">
		<div class="head">
			<p class="eyebrow">After Sunday</p>
			<h2 class="h2">Looking for a church to call home?</h2>
			<p class="lede">
				Love Lakewood Sunday is one morning. But we hope it helps you find a community where you can
				keep growing, keep asking questions, build real relationships, and serve this city. Every
				church below would be genuinely glad to meet you — visit any of them, any Sunday.
			</p>
		</div>

		<ul class="cards">
			{#each churches as church (church.id)}
				<li class="church">
					<div class="church-top">
						<ChurchLogo {church} size={54} />
						<div>
							<h3 class="h3">{church.name}</h3>
							{#if church.language}
								<p class="lang">{church.language}</p>
							{/if}
						</div>
					</div>

					{#if church.blurb}
						<p class="blurb">{church.blurb}</p>
					{/if}

					<dl class="facts">
						{#if church.serviceTimes}
							<div>
								<dt>
									<Icon name="clock" size={16} /><span class="visually-hidden">Service times</span>
								</dt>
								<dd>{church.serviceTimes}</dd>
							</div>
						{/if}
						{#if church.street}
							<div>
								<dt><Icon name="pin" size={16} /><span class="visually-hidden">Address</span></dt>
								<dd>{church.street}<br />{church.city}</dd>
							</div>
						{/if}
					</dl>

					{#if church.url}
						<a class="visit" href={church.url} target="_blank" rel="noopener noreferrer">
							Visit their website
							<Icon name="external" size={15} />
						</a>
					{:else}
						<p class="pending">Website and service times coming soon</p>
					{/if}
				</li>
			{/each}
		</ul>

		<p class="closer">
			Not ready to pick one? That is completely fine. Come on the 20th, and see how it feels.
		</p>
	</div>
</section>

<style>
	section {
		background:
			radial-gradient(100% 70% at 85% 0%, rgb(44 110 127 / 0.3), transparent 60%), var(--deep-2);
	}

	.head {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.85rem;
		max-width: 46rem;
		margin-inline: auto;
	}

	.head .lede {
		max-width: none;
	}

	.cards {
		list-style: none;
		padding: 0;
		margin-top: clamp(2.25rem, 4vw, 3.25rem);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
		gap: 1.15rem;
	}

	.church {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.6rem;
		border-radius: var(--radius-lg);
		background: rgb(255 255 255 / 0.05);
		border: 1px solid var(--line-dark);
		transition:
			background-color 0.18s ease,
			border-color 0.18s ease;
	}

	.church:hover {
		background: rgb(255 255 255 / 0.08);
		border-color: rgb(227 155 46 / 0.4);
	}

	.church-top {
		display: flex;
		align-items: center;
		gap: 0.9rem;
	}

	.church-top h3 {
		color: var(--cream);
	}

	.lang {
		font-size: 0.8125rem;
		color: var(--amber);
		margin-top: 0.15rem;
	}

	.blurb {
		font-size: 0.9375rem;
		color: rgb(252 248 242 / 0.72);
	}

	.facts {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin: 0;
		flex: 1;
	}

	.facts > div {
		display: flex;
		gap: 0.6rem;
		align-items: flex-start;
	}

	dt {
		color: var(--teal-light);
		margin-top: 0.15rem;
		flex-shrink: 0;
	}

	dd {
		margin: 0;
		font-size: 0.9125rem;
		line-height: 1.5;
		color: rgb(252 248 242 / 0.78);
	}

	.visit {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		align-self: flex-start;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--amber);
		text-decoration: none;
		border-bottom: 1.5px solid rgb(227 155 46 / 0.35);
		padding-bottom: 1px;
	}

	.visit:hover {
		border-bottom-color: var(--amber);
	}

	.pending {
		font-size: 0.875rem;
		color: rgb(252 248 242 / 0.45);
		font-style: italic;
	}

	.closer {
		margin-top: clamp(2rem, 4vw, 3rem);
		text-align: center;
		font-family: var(--font-display);
		font-size: clamp(1.0625rem, 2.2vw, 1.3rem);
		font-style: italic;
		font-variation-settings: 'opsz' 24;
		color: rgb(252 248 242 / 0.8);
	}
</style>
