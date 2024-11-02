<script>
	import { cn } from "@kksh/svelte5/utils"
</script>

<div
	class={cn(
		"bottom-0 flex w-full items-center justify-between rounded-b-lg border-t-[1px] px-1 py-1",
		$$props.class
	)}
>
	<slot />
</div>
