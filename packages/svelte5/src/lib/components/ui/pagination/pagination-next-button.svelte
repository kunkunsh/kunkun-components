<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import ChevronRight from "svelte-radix/ChevronRight.svelte";
	import { cn } from "@kksh/svelte5/utils.ts";
	import { buttonVariants } from "@kksh/svelte5/components/ui/button/index.ts";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PaginationPrimitive.NextButtonProps = $props();
</script>

{#snippet Fallback()}
	<span>Next</span>
	<ChevronRight class="size-4" />
{/snippet}

<PaginationPrimitive.NextButton
	bind:ref
	{...restProps}
	class={cn(buttonVariants({ variant: "ghost", className: "gap-1 pr-2.5" }), className)}
	children={children || Fallback}
/>
