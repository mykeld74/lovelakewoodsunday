<script lang="ts">
	import { site, invitation } from '$lib/config/site';
	import Icon from './Icon.svelte';

	let {
		/** Appended to the shared URL so churches can see which channel worked. */
		source = 'site',
		compact = false
	}: { source?: string; compact?: boolean } = $props();

	const shareUrl = $derived(`${site.url}/?utm_source=${source}`);
	const encodedUrl = $derived(encodeURIComponent(shareUrl));
	const encodedText = encodeURIComponent(invitation.short);
	const emailSubject = encodeURIComponent(invitation.subject);

	const links = $derived([
		{
			id: 'sms',
			label: 'Text it',
			icon: 'message',
			// The ?&body= form is the one both iOS and Android accept.
			href: `sms:?&body=${encodeURIComponent(invitation.sms + shareUrl)}`
		},
		{
			id: 'email',
			label: 'Email it',
			icon: 'mail',
			href: `mailto:?subject=${emailSubject}&body=${encodeURIComponent(invitation.email + shareUrl + '\n')}`
		},
		{
			id: 'facebook',
			label: 'Facebook',
			icon: 'share',
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			external: true
		},
		{
			id: 'x',
			label: 'X',
			icon: 'share',
			href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
			external: true
		}
	]);

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout>;

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(shareUrl);
		} catch {
			// Older browsers and non-secure contexts have no clipboard API.
			const field = document.createElement('input');
			field.value = shareUrl;
			document.body.append(field);
			field.select();
			document.execCommand('copy');
			field.remove();
		}
		copied = true;
		clearTimeout(copyTimer);
		copyTimer = setTimeout(() => (copied = false), 2400);
	}

	/**
	 * The OS share sheet, when the browser offers one (most phones). Detected
	 * after mount rather than during render so the server and the client agree
	 * on the initial markup.
	 */
	// eslint-disable-next-line svelte/prefer-writable-derived
	let canNativeShare = $state(false);

	$effect(() => {
		canNativeShare = typeof navigator.share === 'function';
	});

	async function nativeShare() {
		try {
			await navigator.share({
				title: site.name,
				text: invitation.short,
				url: shareUrl
			});
		} catch {
			// The person dismissed the share sheet — nothing to do.
		}
	}
</script>

<div class="share" class:compact>
	<div class="link-row">
		<span class="link-text" title={shareUrl}>{shareUrl.replace(/^https?:\/\//, '')}</span>
		<button type="button" class="btn copy" onclick={copyLink}>
			<Icon name={copied ? 'check' : 'copy'} size={18} />
			{copied ? 'Copied!' : 'Copy link'}
		</button>
	</div>
	<p class="visually-hidden" role="status">{copied ? 'Invitation link copied' : ''}</p>

	<div class="btn-row buttons">
		{#if canNativeShare}
			<button type="button" class="btn btn-outline" onclick={nativeShare}>
				<Icon name="share" size={18} />
				Share
			</button>
		{/if}
		{#each links as link (link.id)}
			<a
				class="btn btn-outline"
				href={link.href}
				target={link.external ? '_blank' : undefined}
				rel={link.external ? 'noopener noreferrer' : undefined}
			>
				<Icon name={link.icon} size={18} />
				{link.label}
			</a>
		{/each}
	</div>
</div>

<style>
	/*
		min-width: 0 all the way down to .link-text. Without it the nowrap URL
		sets a min-content floor that pushes the whole column past the viewport
		on narrow phones.
	*/
	.share {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
	}

	.link-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-width: 0;
		padding: 0.45rem 0.45rem 0.45rem 1.1rem;
		background: var(--paper);
		border: 1.5px solid var(--line-strong);
		border-radius: var(--radius-pill);
		box-shadow: var(--shadow-sm);
	}

	.link-text {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--ink-soft);
	}

	.copy {
		flex-shrink: 0;
		padding: 0.6rem 1.1rem;
		font-size: 0.9375rem;
	}

	.buttons {
		gap: 0.6rem;
	}

	.buttons .btn {
		padding: 0.65rem 1.15rem;
		font-size: 0.9375rem;
		background: var(--paper);
	}

	.compact .buttons .btn {
		padding: 0.55rem 1rem;
		font-size: 0.875rem;
	}
</style>
