<script lang="ts">
	import { enhance } from '$app/forms';
	import { externalForms } from '$lib/config/site';
	import Icon from './Icon.svelte';

	type ContactResult = {
		success?: boolean;
		errors?: Record<string, string>;
		values?: Record<string, string>;
	} | null;

	let { form }: { form?: ContactResult } = $props();

	let submitting = $state(false);

	/*
		Set after mount, not with $derived: this must be when *this visitor's*
		browser rendered the form. A $derived would run during SSR, so a cached
		page would hand everyone the same stale time and the server's
		"submitted too fast" check would misfire.
	*/
	// eslint-disable-next-line svelte/prefer-writable-derived
	let startedAt = $state('');

	$effect(() => {
		startedAt = String(Date.now());
	});

	const errors = $derived(form?.errors ?? {});
	const values = $derived(form?.values ?? {});
</script>

<section id="contact" class="section surface-sand">
	<div class="container">
		<div class="layout">
			<div class="intro">
				<p class="eyebrow">Contact</p>
				<h2 class="h2">Still have a question?</h2>
				<p class="lede">
					Send it over. A real person from one of the participating churches will get back to you —
					usually within a day or two.
				</p>
				<ul class="promises">
					<li><Icon name="check" size={17} /> We will not add you to any mailing list</li>
					<li><Icon name="check" size={17} /> We will not pass your info to anyone else</li>
					<li><Icon name="check" size={17} /> No question is too small or too skeptical</li>
				</ul>
			</div>

			<div class="form-card">
				{#if form?.success}
					<div class="success" role="status">
						<span class="success-icon"><Icon name="check" size={26} /></span>
						<h3 class="h3">Thanks — we got it.</h3>
						<p>
							Your message is on its way to someone who can answer it. Keep an eye on your email
							over the next day or two.
						</p>
						<a class="btn btn-outline" href="#invite">Invite someone while you’re here</a>
					</div>
				{:else if externalForms.contact}
					<div class="external">
						<h3 class="h3">Ask us anything</h3>
						<p>Our contact form opens in a new tab.</p>
						<a class="btn" href={externalForms.contact} target="_blank" rel="noopener noreferrer">
							Open the contact form
							<Icon name="external" size={16} />
						</a>
					</div>
				{:else}
					<form
						method="POST"
						action="/?/contact"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update({ reset: true });
								submitting = false;
							};
						}}
					>
						<div class="hp-field" aria-hidden="true">
							<label for="contact-website">Leave this field empty</label>
							<input
								id="contact-website"
								name="website"
								type="text"
								tabindex="-1"
								autocomplete="off"
							/>
						</div>
						<input type="hidden" name="started_at" value={startedAt} />

						<div class="field">
							<label for="contact-name">Your name</label>
							<input
								id="contact-name"
								name="name"
								class="input"
								autocomplete="name"
								required
								value={values.name ?? ''}
								aria-invalid={errors.name ? 'true' : undefined}
								aria-describedby={errors.name ? 'contact-name-error' : undefined}
							/>
							{#if errors.name}
								<p class="error-text" id="contact-name-error">{errors.name}</p>
							{/if}
						</div>

						<div class="row">
							<div class="field">
								<label for="contact-email">Email</label>
								<input
									id="contact-email"
									name="email"
									type="email"
									class="input"
									autocomplete="email"
									required
									value={values.email ?? ''}
									aria-invalid={errors.email ? 'true' : undefined}
									aria-describedby={errors.email ? 'contact-email-error' : undefined}
								/>
								{#if errors.email}
									<p class="error-text" id="contact-email-error">{errors.email}</p>
								{/if}
							</div>

							<div class="field">
								<label for="contact-phone">
									Phone <span class="hint">(optional)</span>
								</label>
								<input
									id="contact-phone"
									name="phone"
									type="tel"
									class="input"
									autocomplete="tel"
									value={values.phone ?? ''}
									aria-invalid={errors.phone ? 'true' : undefined}
									aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
								/>
								{#if errors.phone}
									<p class="error-text" id="contact-phone-error">{errors.phone}</p>
								{/if}
							</div>
						</div>

						<div class="field">
							<label for="contact-message">Your question or message</label>
							<textarea
								id="contact-message"
								name="message"
								class="textarea"
								required
								aria-invalid={errors.message ? 'true' : undefined}
								aria-describedby={errors.message ? 'contact-message-error' : undefined}
								>{values.message ?? ''}</textarea
							>
							{#if errors.message}
								<p class="error-text" id="contact-message-error">{errors.message}</p>
							{/if}
						</div>

						{#if errors.form}
							<p class="error-text" role="alert">{errors.form}</p>
						{/if}

						<button type="submit" class="btn btn-lg submit" disabled={submitting}>
							{submitting ? 'Sending…' : 'Send your message'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.layout {
		display: grid;
		gap: clamp(2rem, 4vw, 3.5rem);
		align-items: start;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.promises {
		list-style: none;
		padding: 0;
		margin-top: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.promises li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.9375rem;
		color: var(--ink-soft);
	}

	.promises :global(svg) {
		color: var(--teal);
		flex-shrink: 0;
	}

	.form-card {
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		padding: clamp(1.5rem, 3vw, 2.25rem);
		box-shadow: var(--shadow-md);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
	}

	.row {
		display: grid;
		gap: 1.15rem;
	}

	.submit {
		align-self: flex-start;
		margin-top: 0.35rem;
	}

	.success,
	.external {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		padding-block: 0.5rem;
	}

	.success p,
	.external p {
		color: var(--ink-soft);
	}

	.success-icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: color-mix(in srgb, var(--teal) 14%, transparent);
		color: var(--teal);
		margin-bottom: 0.25rem;
	}

	.success .btn,
	.external .btn {
		margin-top: 0.5rem;
	}

	@media (min-width: 560px) {
		.row {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 960px) {
		.layout {
			grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		}
	}
</style>
