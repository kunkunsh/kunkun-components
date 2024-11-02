<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
	import { buttonVariants } from "@kksh/svelte5/components/ui/button/index.ts";
	import { cn } from "@kksh/svelte5/utils.ts";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<ChevronLeft class="size-4" />
{/snippet}

<CalendarPrimitive.PrevButton
	bind:ref
	class={cn(
		buttonVariants({ variant: "outline" }),
		"size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
		className
	)}
	{...restProps}
	children={children || Fallback}
/>
