<script lang="ts">
	import ShareButtons from './ShareButtons.svelte';
	import Icon from './Icon.svelte';
</script>

<section id="invite" class="section surface-sand">
	<div class="container">
		<div class="layout">
			<div class="copy">
				<p class="eyebrow">Invite someone</p>
				<h2 class="h2">Most people come because a friend asked them.</h2>
				<p class="lede">
					Not a flyer. Not an ad. A person they trust saying “come with me.” If there is someone you
					have been thinking about — a neighbor, a coworker, your brother-in-law — this is an easy
					morning to invite them to.
				</p>

				<ShareButtons />

				<p class="fine">
					Every link goes to this page, so whoever you send it to gets the same honest answers you
					did.
				</p>
			</div>

			<aside class="preview" aria-label="Example invitation">
				<div class="phone">
					<div class="bubble them">
						Hey — free Sunday the 20th? Something’s happening at Bear Creek High School.
					</div>
					<div class="bubble them">
						Bunch of Lakewood churches doing one service together. It’s free, about an hour, super
						casual. Want to come with me?
					</div>
					<div class="bubble me">honestly… yeah, why not</div>
				</div>
				<p class="preview-note">
					<Icon name="heart" size={16} />
					That’s the whole thing. No pitch required.
				</p>
			</aside>
		</div>
	</div>
</section>

<style>
	.layout {
		display: grid;
		gap: clamp(2.5rem, 5vw, 4rem);
		align-items: center;
	}

	.copy {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
	}

	.copy :global(.share) {
		margin-top: 0.75rem;
	}

	.fine {
		font-size: 0.875rem;
		color: var(--ink-faint);
	}

	.phone {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.5rem 1.25rem;
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
	}

	.bubble {
		max-width: 85%;
		padding: 0.7rem 1rem;
		border-radius: 1.15rem;
		font-size: 0.9375rem;
		line-height: 1.45;
	}

	.them {
		align-self: flex-start;
		background: var(--sand);
		border-bottom-left-radius: 0.35rem;
	}

	.me {
		align-self: flex-end;
		background: var(--teal);
		color: #fff;
		border-bottom-right-radius: 0.35rem;
	}

	.preview-note {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		margin-top: 0.85rem;
		font-size: 0.875rem;
		color: var(--ink-faint);
	}

	.preview-note :global(svg) {
		color: var(--clay);
	}

	@media (min-width: 900px) {
		.layout {
			grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
		}
	}
</style>
