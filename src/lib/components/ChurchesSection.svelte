<script lang="ts">
	import { churches } from '$lib/data/churches';
	import ChurchLogo from './ChurchLogo.svelte';
</script>

<section id="churches" class="section">
	<div class="container">
		<div class="head">
			<p class="eyebrow">Hosted together</p>
			<h2 class="h2">{churches.length} Lakewood churches, one morning</h2>
			<p class="lede">
				Different buildings, different Sundays, different styles — setting all of that aside for one
				morning because we love the same city. More churches are joining as the date gets closer.
			</p>
		</div>

		<ul class="roster">
			{#each churches as church (church.id)}
				<li>
					{#if church.url}
						<a href={church.url} target="_blank" rel="noopener noreferrer">
							<ChurchLogo {church} size={52} />
							<span class="name">{church.name}</span>
						</a>
					{:else}
						<div>
							<ChurchLogo {church} size={52} />
							<span class="name">{church.name}</span>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.head {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.85rem;
	}

	.head .lede {
		margin-inline: auto;
	}

	.roster {
		list-style: none;
		padding: 0;
		margin-top: clamp(2.25rem, 4vw, 3.25rem);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.roster a,
	.roster div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.85rem;
		height: 100%;
		min-height: 11rem;
		padding: 1.75rem 1.25rem;
		background: var(--paper);
		text-align: center;
		text-decoration: none;
		transition: background-color 0.16s ease;
	}

	.roster a:hover {
		background: var(--sand);
	}

	.name {
		font-family: var(--font-display);
		font-size: 1.0625rem;
		font-weight: 600;
		font-variation-settings: 'opsz' 24;
		line-height: 1.25;
		text-wrap: balance;
	}
</style>
