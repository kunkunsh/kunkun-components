<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants"

	export const alertVariants = tv({
		base: "[&>svg]:text-foreground relative w-full rounded-lg border px-4 py-3 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
		variants: {
			variant: {
				default: "bg-background text-foreground",
				destructive:
					"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
				error: "border-red-600 text-red-600 dark:border-red-500 [&>svg]:text-red-500",
				warning: "border-yellow-600 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-500",
				success: "border-green-600 text-green-600 dark:border-green-500 [&>svg]:text-green-500",
				info: "border-blue-600 text-blue-600 dark:border-blue-500 [&>svg]:text-blue-500"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	})

	export type AlertVariant = VariantProps<typeof alertVariants>["variant"]
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements"
	import type { WithElementRef } from "bits-ui"
	import { cn } from "$lib/utils.js"

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant
	} = $props()
</script>

<div bind:this={ref} class={cn(alertVariants({ variant }), className)} {...restProps} role="alert">
	{@render children?.()}
</div>
