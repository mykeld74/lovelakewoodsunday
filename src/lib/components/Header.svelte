<script lang="ts">
	import { page } from '$app/state';
	import Wordmark from './Wordmark.svelte';

	const links = [
		{ href: '/visit', label: 'Plan your visit' },
		{ href: '/what-to-expect', label: 'What to expect' },
		{ href: '/churches', label: 'Churches' },
		{ href: '/volunteer', label: 'Volunteer' },
		{ href: '/faq', label: 'Questions' }
	];

	let open = $state(false);
	let scrolled = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 12;
	}

	function close() {
		open = false;
	}

	/** Marks the section a guest is currently in, now that these are real pages. */
	const isCurrent = (href: string) => page.url.pathname === href;
</script>

<svelte:window onscroll={onScroll} />

<header class="header" class:scrolled class:open>
	<div class="container bar">
		<a href="/" class="brand" aria-label="Love Lakewood Sunday — home">
			<Wordmark size="sm" />
		</a>

		<nav class="desktop-nav" aria-label="Main">
			{#each links as link (link.href)}
				<a href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined}>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="actions">
			<a href="/#invite" class="btn invite-btn">Invite a friend</a>
			<button
				type="button"
				class="menu-toggle"
				aria-expanded={open}
				aria-controls="mobile-nav"
				onclick={() => (open = !open)}
			>
				<span class="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
				<span class="bars" aria-hidden="true">
					<span></span>
					<span></span>
				</span>
			</button>
		</div>
	</div>

	<!--
		Each link closes the menu itself rather than relying on a URL change:
		most of these are hash targets on the page you are already on, which is
		not a navigation the router reports.
	-->
	<nav id="mobile-nav" class="mobile-nav" aria-label="Main" hidden={!open}>
		<div class="container mobile-inner">
			{#each links as link (link.href)}
				<a
					href={link.href}
					onclick={close}
					aria-current={isCurrent(link.href) ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
			<a href="/#invite" class="btn invite-mobile" onclick={close}>Invite a friend</a>
		</div>
	</nav>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: color-mix(in srgb, var(--cream) 88%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid transparent;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
	}

	.header.scrolled,
	.header.open {
		border-bottom-color: var(--line);
		box-shadow: 0 1px 20px rgb(22 38 46 / 0.05);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 4.25rem;
	}

	.brand {
		text-decoration: none;
		flex-shrink: 0;
	}

	.desktop-nav {
		display: none;
		gap: 1.75rem;
	}

	.desktop-nav a {
		font-size: 0.9375rem;
		font-weight: 500;
		text-decoration: none;
		color: var(--ink-soft);
		padding-block: 0.25rem;
		border-bottom: 2px solid transparent;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.desktop-nav a:hover {
		color: var(--ink);
		border-bottom-color: var(--amber);
	}

	.desktop-nav a[aria-current='page'] {
		color: var(--ink);
		border-bottom-color: var(--amber);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.invite-btn {
		display: none;
		padding: 0.6rem 1.15rem;
		font-size: 0.9375rem;
	}

	.menu-toggle {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		background: transparent;
		border: 1.5px solid var(--line-strong);
		border-radius: var(--radius-pill);
		cursor: pointer;
	}

	.bars {
		display: grid;
		gap: 5px;
		width: 18px;
	}

	.bars span {
		height: 2px;
		background: var(--ink);
		border-radius: 2px;
		transition: transform 0.2s ease;
	}

	.open .bars span:first-child {
		transform: translateY(3.5px) rotate(45deg);
	}

	.open .bars span:last-child {
		transform: translateY(-3.5px) rotate(-45deg);
	}

	.mobile-nav {
		border-top: 1px solid var(--line);
		background: var(--cream);
		padding-block: 0.75rem 1.25rem;
	}

	.mobile-nav[hidden] {
		display: none;
	}

	.mobile-inner {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.mobile-nav a {
		text-decoration: none;
		font-size: 1.0625rem;
		font-weight: 500;
		padding: 0.7rem 0;
		border-bottom: 1px solid var(--line);
	}

	.mobile-nav a:last-child {
		border-bottom: none;
	}

	.mobile-nav a[aria-current='page'] {
		color: var(--amber-deep);
	}

	.invite-mobile {
		margin-top: 0.75rem;
		align-self: flex-start;
	}

	@media (min-width: 900px) {
		.desktop-nav {
			display: flex;
		}

		.invite-btn {
			display: inline-flex;
		}

		.menu-toggle,
		.mobile-nav {
			display: none;
		}
	}
</style>
