<script lang="ts">
	import Icon from './Icon.svelte';

	let { label, text }: { label: string; text: string } = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copy() {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			const area = document.createElement('textarea');
			area.value = text;
			document.body.append(area);
			area.select();
			document.execCommand('copy');
			area.remove();
		}
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 2400);
	}
</script>

<div class="block">
	<div class="head">
		<h3>{label}</h3>
		<button type="button" class="btn btn-outline" onclick={copy}>
			<Icon name={copied ? 'check' : 'copy'} size={16} />
			{copied ? 'Copied' : 'Copy'}
		</button>
	</div>
	<pre>{text}</pre>
</div>

<style>
	.block {
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 0.85rem 0.85rem 1.35rem;
		background: var(--sand);
		border-bottom: 1px solid var(--line);
	}

	h3 {
		font-family: var(--font-body);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	.head .btn {
		padding: 0.45rem 0.9rem;
		font-size: 0.875rem;
		background: var(--paper);
		flex-shrink: 0;
	}

	pre {
		margin: 0;
		padding: 1.35rem;
		font-family: var(--font-body);
		font-size: 0.9375rem;
		line-height: 1.6;
		white-space: pre-wrap;
		word-break: break-word;
		color: var(--ink-soft);
	}
</style>
