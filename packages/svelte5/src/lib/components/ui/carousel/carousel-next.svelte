<script lang="ts">
	import ArrowRight from "svelte-radix/ArrowRight.svelte";
	import type { WithoutChildren } from "bits-ui";
	import { getEmblaContext } from "./context.ts";
	import { cn } from "@kksh/svelte5/utils.ts";
	import { Button, type Props } from "@kksh/svelte5/components/ui/button/index.ts";

	let {
		ref = $bindable(null),
		class: className,
		variant = "outline",
		size = "icon",
		...restProps
	}: WithoutChildren<Props> = $props();

	const emblaCtx = getEmblaContext("<Carousel.Next/>");
</script>

<Button
	{variant}
	{size}
	class={cn(
		"absolute size-8 touch-manipulation rounded-full",
		emblaCtx.orientation === "horizontal"
			? "-right-12 top-1/2 -translate-y-1/2"
			: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
		className
	)}
	disabled={!emblaCtx.canScrollNext}
	onclick={emblaCtx.scrollNext}
	onkeydown={emblaCtx.handleKeyDown}
	bind:ref
	{...restProps}
>
	<ArrowRight class="size-4" />
	<span class="sr-only">Next slide</span>
</Button>
