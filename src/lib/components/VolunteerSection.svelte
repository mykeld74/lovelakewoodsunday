<script lang="ts">
	import { volunteerRoles } from '$lib/data/volunteer';
	import { externalForms } from '$lib/config/site';
	import Icon from './Icon.svelte';

	const icons: Record<string, string> = {
		hospitality: 'users',
		parking: 'car',
		safety: 'shield',
		prayer: 'hands',
		'setup-teardown': 'box',
		wherever: 'sparkle'
	};

	// The last role is a catch-all — it belongs on the form, not in this list.
	const shown = volunteerRoles.filter((role) => role.id !== 'wherever');
	const href = externalForms.volunteer || '/volunteer';
</script>

<section id="serve" class="section">
	<div class="container">
		<div class="band">
			<div class="head">
				<p class="eyebrow">Lend a hand</p>
				<h2 class="h2">A morning like this takes a few hundred people</h2>
				<p class="lede">
					Every job is small, and most of them are just being kind to someone in a parking lot. If
					you can give a couple of hours on September 20, there is a spot for you.
				</p>
				<a class="btn btn-lg serve-btn" {href}>
					Serve at Love Lakewood Sunday
					<Icon name="arrow" size={18} />
				</a>
			</div>

			<ul class="roles">
				{#each shown as role (role.id)}
					<li>
						<span class="role-icon"><Icon name={icons[role.id] ?? 'sparkle'} size={18} /></span>
						<div>
							<h3>{role.name}</h3>
							<p>{role.description}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.band {
		display: grid;
		gap: clamp(2rem, 4vw, 3.5rem);
		padding: clamp(2rem, 5vw, 3.75rem);
		border-radius: var(--radius-lg);
		background:
			radial-gradient(110% 120% at 0% 0%, rgb(227 155 46 / 0.35), transparent 55%),
			linear-gradient(150deg, #b34f31, #8f3d2c);
		color: #fdf4ec;
		box-shadow: var(--shadow-lg);
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		align-items: flex-start;
	}

	.head .eyebrow {
		color: var(--amber-glow);
	}

	.head .lede {
		color: rgb(253 244 236 / 0.82);
	}

	.serve-btn {
		margin-top: 0.75rem;
		--btn-bg: var(--cream);
		--btn-fg: #7a3325;
	}

	.roles {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 1.15rem;
		align-content: center;
	}

	.roles li {
		display: flex;
		gap: 0.85rem;
	}

	.role-icon {
		flex-shrink: 0;
		display: grid;
		place-items: center;
		width: 2.15rem;
		height: 2.15rem;
		border-radius: var(--radius-sm);
		background: rgb(255 255 255 / 0.14);
		border: 1px solid rgb(255 255 255 / 0.22);
		color: var(--amber-glow);
	}

	.roles h3 {
		font-family: var(--font-body);
		font-size: 0.9375rem;
		font-weight: 700;
		letter-spacing: 0.01em;
	}

	.roles p {
		font-size: 0.9125rem;
		line-height: 1.5;
		color: rgb(253 244 236 / 0.72);
		margin-top: 0.15rem;
	}

	@media (min-width: 900px) {
		.band {
			grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
			align-items: center;
		}
	}
</style>
