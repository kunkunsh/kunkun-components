<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { buttonVariants } from "@kksh/svelte5/components/ui/button/index.js";
	import { cn } from "@kksh/svelte5/utils.js";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: AlertDialogPrimitive.ActionProps = $props();
</script>

<AlertDialogPrimitive.Action bind:ref class={cn(buttonVariants(), className)} {...restProps} />
