<script lang="ts">
	import { media } from '$lib/config/site';
	import { churches } from '$lib/data/churches';
	import { toEmbedUrl } from '$lib/utils/video';
	import Icon from './Icon.svelte';

	const embed = toEmbedUrl(media.welcomeVideo);
	let playing = $state(false);

	/** 1 when this section leads its own page, so each page has one <h1>. */
	let { level = 2 }: { level?: 1 | 2 } = $props();
</script>

<section id="welcome" class="section surface-sand">
	<div class="container container-narrow">
		<div class="head">
			<p class="eyebrow">A word from the pastors</p>
			<svelte:element this={level === 1 ? 'h1' : 'h2'} class="h2"
				>The people behind the invitation</svelte:element
			>
			<p class="lede">
				Pastors from every participating church share why {churches.length} congregations decided to set
				their own Sunday aside and gather as one — and why they hope you’ll come.
			</p>
		</div>

		{#if embed}
			<div class="frame">
				{#if playing}
					<iframe
						src={embed}
						title="Welcome video from the pastors of Love Lakewood Sunday"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
						allowfullscreen
					></iframe>
				{:else}
					<button type="button" class="poster" onclick={() => (playing = true)}>
						{#if media.welcomeVideoPoster}
							<img src={media.welcomeVideoPoster} alt="" />
						{/if}
						<span class="play"><Icon name="play" size={30} /></span>
						<span class="play-label">Watch the welcome — about 2 minutes</span>
					</button>
				{/if}
			</div>
		{:else}
			<!-- Placeholder until the video is filmed. Set media.welcomeVideo to swap it in. -->
			<div class="frame pending">
				<div class="pending-inner">
					<span class="pending-icon"><Icon name="play" size={26} /></span>
					<p class="pending-title">The welcome video is being filmed</p>
					<p class="pending-sub">
						Pastors from all {churches.length} churches are recording a short invitation. It will appear
						here as soon as it is ready.
					</p>
					<a class="btn btn-outline" href="#invite">Invite someone in the meantime</a>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.head {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.85rem;
		margin-bottom: clamp(2rem, 4vw, 3rem);
	}

	.frame {
		position: relative;
		aspect-ratio: 16 / 9;
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--line-strong);
		box-shadow: var(--shadow-lg);
		background: var(--deep);
	}

	.frame iframe {
		width: 100%;
		height: 100%;
		border: 0;
	}

	.poster {
		position: absolute;
		inset: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1.5rem;
		border: 0;
		cursor: pointer;
		background: radial-gradient(90% 90% at 50% 40%, #1c4a5b, var(--deep-2));
		color: var(--cream);
	}

	.poster img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.65;
	}

	.play {
		position: relative;
		display: grid;
		place-items: center;
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 50%;
		background: var(--amber);
		color: #1d1405;
		box-shadow: 0 8px 30px rgb(0 0 0 / 0.35);
		transition: transform 0.18s ease;
	}

	.poster:hover .play {
		transform: scale(1.06);
	}

	.play-label {
		position: relative;
		font-size: 0.9375rem;
		font-weight: 600;
	}

	.pending {
		background: linear-gradient(160deg, #14384a, var(--deep-2));
	}

	.pending-inner {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		text-align: center;
		padding: 1.75rem;
		color: var(--cream);
	}

	.pending-icon {
		display: grid;
		place-items: center;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		border: 1.5px dashed rgb(227 155 46 / 0.6);
		color: var(--amber);
		margin-bottom: 0.35rem;
	}

	.pending-title {
		font-family: var(--font-display);
		font-size: clamp(1.15rem, 2.4vw, 1.5rem);
		font-variation-settings: 'opsz' 32;
		font-weight: 600;
	}

	.pending-sub {
		font-size: 0.9375rem;
		color: rgb(252 248 242 / 0.7);
		max-width: 34rem;
	}

	.pending .btn {
		margin-top: 0.85rem;
		--btn-bg: transparent;
		--btn-fg: var(--cream);
		--btn-border: rgb(255 255 255 / 0.3);
	}

	.pending .btn:hover {
		--btn-border: var(--amber);
	}
</style>
