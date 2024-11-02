<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn } from "@kksh/svelte5/utils.ts";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: AlertDialogPrimitive.DescriptionProps = $props();
</script>

<AlertDialogPrimitive.Description
	bind:ref
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
/>
