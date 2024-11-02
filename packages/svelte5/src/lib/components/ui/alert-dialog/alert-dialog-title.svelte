<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn } from "@kksh/svelte5/utils.ts";

	let {
		class: className,
		level = 3,
		ref = $bindable(null),
		...restProps
	}: AlertDialogPrimitive.TitleProps = $props();
</script>

<AlertDialogPrimitive.Title
	bind:ref
	class={cn("text-lg font-semibold", className)}
	{level}
	{...restProps}
/>
