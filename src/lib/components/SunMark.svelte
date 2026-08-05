<script lang="ts">
	/**
	 * The event mark: a sun coming up behind two overlapping foothills.
	 *
	 * Morning light and two ridges leaning on each other — hopeful and local,
	 * with no denominational imagery, so it belongs to every church equally.
	 * Placeholder until the shared event graphic arrives.
	 */
	let { size = 40, class: className = '' }: { size?: number; class?: string } = $props();

	// The mark appears more than once per page (header and footer), so the
	// clipPath needs an id that is unique per instance.
	const uid = $props.id();
	const clipId = `sunmark-clip-${uid}`;
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 48 48"
	fill="none"
	role="presentation"
	aria-hidden="true"
	class={className}
>
	<clipPath id={clipId}>
		<circle cx="24" cy="24" r="22" />
	</clipPath>
	<g clip-path="url(#{clipId})">
		<circle cx="24" cy="24" r="22" fill="currentColor" opacity="0.08" />
		<!-- rising sun -->
		<circle cx="24" cy="27" r="9.5" fill="var(--amber, #e39b2e)" />
		<!-- back ridge -->
		<path
			d="M-4 34c7-9 13-9 20 0s13 9 20 0 12-6 12-6v22H-4z"
			fill="var(--teal, #2c6e7f)"
			opacity="0.55"
		/>
		<!-- front ridge -->
		<path d="M-4 40c9-8 15-4 22 1s14 4 22-3v14H-4z" fill="var(--deep, #113240)" />
	</g>
	<circle cx="24" cy="24" r="21.25" stroke="currentColor" stroke-width="1.5" opacity="0.22" />
</svg>
