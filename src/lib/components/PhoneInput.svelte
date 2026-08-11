<script lang="ts">
	import { formatPhoneInput } from '$lib/utils/phone';

	let {
		id,
		name = 'phone',
		value = '',
		invalid = false,
		describedBy
	}: {
		id: string;
		name?: string;
		value?: string;
		invalid?: boolean;
		describedBy?: string;
	} = $props();

	let phone = $state('');

	$effect(() => {
		phone = formatPhoneInput(value);
	});

	function onInput(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const cursor = input.selectionStart ?? input.value.length;
		const digitsBefore = phoneDigitsBefore(input.value, cursor);

		const formatted = formatPhoneInput(input.value);
		phone = formatted;
		input.value = formatted;

		const nextCursor = cursorAfterDigits(formatted, digitsBefore);
		input.setSelectionRange(nextCursor, nextCursor);
	}

	function phoneDigitsBefore(value: string, index: number): number {
		let count = 0;
		for (let i = 0; i < index && i < value.length; i++) {
			if (/\d/.test(value[i])) count++;
		}
		return count;
	}

	function cursorAfterDigits(value: string, digits: number): number {
		if (digits === 0) return 0;

		let count = 0;
		for (let i = 0; i < value.length; i++) {
			if (/\d/.test(value[i])) count++;
			if (count === digits) return i + 1;
		}
		return value.length;
	}
</script>

<input
	{id}
	{name}
	type="tel"
	class="input"
	autocomplete="tel"
	inputmode="tel"
	placeholder="(555) 555-5555"
	maxlength="14"
	value={phone}
	oninput={onInput}
	aria-invalid={invalid ? 'true' : undefined}
	aria-describedby={describedBy}
/>
