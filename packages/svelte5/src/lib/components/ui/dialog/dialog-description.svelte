<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "@kksh/svelte5/utils.ts";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.DescriptionProps = $props();
</script>

<DialogPrimitive.Description
	bind:ref
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
/>
