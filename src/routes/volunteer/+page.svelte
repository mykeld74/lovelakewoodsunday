<script lang="ts">
	import { enhance } from '$app/forms';
	import Seo from '$lib/components/Seo.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { volunteerRoles } from '$lib/data/volunteer';
	import { event, venue, externalForms } from '$lib/config/site';

	let { form } = $props();

	let submitting = $state(false);

	/*
		Deliberately set after mount rather than with $derived: this has to be the
		moment *this visitor's* browser rendered the form. A $derived would run
		during SSR, so a cached page would hand everyone the same stale render
		time and the server's "submitted too fast" check would misfire.
	*/
	// eslint-disable-next-line svelte/prefer-writable-derived
	let startedAt = $state('');

	$effect(() => {
		startedAt = String(Date.now());
	});

	const errors = $derived((form?.errors ?? {}) as Record<string, string>);
	const values = $derived((form?.values ?? {}) as Record<string, string | string[]>);
	const chosen = $derived(new Set((values.roles as string[]) ?? []));
</script>

<Seo
	title="Serve at Love Lakewood Sunday"
	description="Volunteer for Love Lakewood Sunday on September 20, 2026 — hospitality, parking, safety, prayer, and set-up. A couple of hours makes the whole morning work."
/>

<section class="hero">
	<div class="container">
		<a class="back" href="/">
			<Icon name="arrow" size={16} class="flip" />
			Back to the event
		</a>

		<p class="eyebrow">Volunteer</p>
		<h1 class="h2">Serve at Love Lakewood Sunday</h1>
		<p class="lede">
			{event.dateLabel} at {venue.name}. Most roles ask for a couple of hours, and none of them
			require experience — just a willingness to be kind to whoever walks up.
		</p>
	</div>
</section>

<section class="section form-section">
	<div class="container">
		{#if form?.success}
			<div class="thanks card">
				<span class="thanks-icon"><Icon name="check" size={30} /></span>
				<h2 class="h2">Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h2>
				<p>
					You’re on the list. Someone from the volunteer team will reach out with times, details,
					and where to meet as we get closer to {event.dateShort}.
				</p>
				<div class="btn-row">
					<a class="btn" href="/#invite">Now go invite somebody</a>
					<a class="btn btn-outline" href="/">Back to the event</a>
				</div>
			</div>
		{:else if externalForms.volunteer}
			<div class="thanks card">
				<h2 class="h2">Sign up to serve</h2>
				<p>Our volunteer form opens in a new tab.</p>
				<a class="btn" href={externalForms.volunteer} target="_blank" rel="noopener noreferrer">
					Open the volunteer form
					<Icon name="external" size={16} />
				</a>
			</div>
		{:else}
			<form
				method="POST"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update({ reset: true });
						submitting = false;
					};
				}}
			>
				<div class="hp-field" aria-hidden="true">
					<label for="vol-website">Leave this field empty</label>
					<input id="vol-website" name="website" type="text" tabindex="-1" autocomplete="off" />
				</div>
				<input type="hidden" name="started_at" value={startedAt} />

				<fieldset class="roles-fieldset">
					<legend class="fieldset-legend">
						Where would you like to help?
						<span class="hint">Choose as many as you like.</span>
					</legend>

					{#if errors.roles}
						<p class="error-text" role="alert">{errors.roles}</p>
					{/if}

					<div class="roles">
						{#each volunteerRoles as role (role.id)}
							<label class="role">
								<input type="checkbox" name="roles" value={role.id} checked={chosen.has(role.id)} />
								<span class="role-body">
									<span class="role-name">{role.name}</span>
									<span class="role-desc">{role.description}</span>
								</span>
							</label>
						{/each}
					</div>
				</fieldset>

				<fieldset class="details-fieldset">
					<legend class="fieldset-legend">How do we reach you?</legend>

					<div class="grid">
						<div class="field">
							<label for="vol-name">Your name</label>
							<input
								id="vol-name"
								name="name"
								class="input"
								autocomplete="name"
								required
								value={values.name ?? ''}
								aria-invalid={errors.name ? 'true' : undefined}
								aria-describedby={errors.name ? 'vol-name-error' : undefined}
							/>
							{#if errors.name}<p class="error-text" id="vol-name-error">{errors.name}</p>{/if}
						</div>

						<div class="field">
							<label for="vol-email">Email</label>
							<input
								id="vol-email"
								name="email"
								type="email"
								class="input"
								autocomplete="email"
								required
								value={values.email ?? ''}
								aria-invalid={errors.email ? 'true' : undefined}
								aria-describedby={errors.email ? 'vol-email-error' : undefined}
							/>
							{#if errors.email}<p class="error-text" id="vol-email-error">{errors.email}</p>{/if}
						</div>

						<div class="field">
							<label for="vol-phone">Phone <span class="hint">(optional)</span></label>
							<input
								id="vol-phone"
								name="phone"
								type="tel"
								class="input"
								autocomplete="tel"
								value={values.phone ?? ''}
								aria-invalid={errors.phone ? 'true' : undefined}
								aria-describedby={errors.phone ? 'vol-phone-error' : undefined}
							/>
							{#if errors.phone}<p class="error-text" id="vol-phone-error">{errors.phone}</p>{/if}
						</div>

						<div class="field">
							<label for="vol-church">
								Church you attend <span class="hint">(optional)</span>
							</label>
							<input
								id="vol-church"
								name="church"
								class="input"
								value={values.church ?? ''}
								placeholder="Or leave blank — not required"
							/>
						</div>
					</div>

					<div class="field">
						<label for="vol-notes">
							Anything we should know? <span class="hint">(optional)</span>
						</label>
						<textarea
							id="vol-notes"
							name="notes"
							class="textarea"
							placeholder="Times you're available, people you'd like to serve with, questions…"
							>{values.notes ?? ''}</textarea
						>
					</div>
				</fieldset>

				{#if errors.form}
					<p class="error-text" role="alert">{errors.form}</p>
				{/if}

				<button type="submit" class="btn btn-lg submit" disabled={submitting}>
					{submitting ? 'Signing you up…' : 'Count me in'}
				</button>

				<p class="fine">
					We’ll only use your contact info to organize this one morning. Nothing else, ever.
				</p>
			</form>
		{/if}
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

	.form-section .container {
		max-width: 54rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	fieldset {
		border: 0;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	legend {
		padding: 0;
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-variation-settings: 'opsz' 24;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	legend .hint {
		font-family: var(--font-body);
		font-size: 0.875rem;
		font-weight: 400;
		color: var(--ink-faint);
	}

	.roles {
		display: grid;
		gap: 0.75rem;
	}

	.role {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
		padding: 1.1rem 1.25rem;
		background: var(--paper);
		border: 1.5px solid var(--line);
		border-radius: var(--radius);
		cursor: pointer;
		transition:
			border-color 0.15s ease,
			background-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.role:hover {
		border-color: var(--line-strong);
	}

	.role:has(input:checked) {
		border-color: var(--teal);
		background: color-mix(in srgb, var(--teal) 5%, var(--paper));
		box-shadow: var(--shadow-sm);
	}

	.role:has(input:focus-visible) {
		outline: 3px solid var(--teal);
		outline-offset: 3px;
	}

	.role input {
		flex-shrink: 0;
		width: 1.25rem;
		height: 1.25rem;
		margin-top: 0.15rem;
		accent-color: var(--teal);
	}

	.role-body {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.role-name {
		font-weight: 600;
	}

	.role-desc {
		font-size: 0.9125rem;
		line-height: 1.5;
		color: var(--ink-soft);
	}

	.grid {
		display: grid;
		gap: 1.15rem;
	}

	.details-fieldset {
		gap: 1.15rem;
	}

	.submit {
		align-self: flex-start;
	}

	.fine {
		font-size: 0.875rem;
		color: var(--ink-faint);
	}

	.thanks {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.85rem;
		padding: clamp(1.75rem, 4vw, 2.75rem);
	}

	.thanks p {
		color: var(--ink-soft);
		max-width: 38rem;
	}

	.thanks-icon {
		display: grid;
		place-items: center;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background: color-mix(in srgb, var(--teal) 14%, transparent);
		color: var(--teal);
	}

	.thanks .btn-row {
		margin-top: 0.75rem;
	}

	@media (min-width: 640px) {
		.roles {
			grid-template-columns: 1fr 1fr;
		}

		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
