<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { buttonVariants } from "@kksh/svelte5/components/ui/button/index.ts";
	import { cn } from "@kksh/svelte5/utils.ts";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: AlertDialogPrimitive.ActionProps = $props();
</script>

<AlertDialogPrimitive.Action bind:ref class={cn(buttonVariants(), className)} {...restProps} />
