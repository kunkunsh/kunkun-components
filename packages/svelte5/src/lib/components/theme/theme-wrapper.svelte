<script lang="ts">
	import { config } from "$lib/stores/config.js";
	import { type PrimitiveDivAttributes, cn, updateTheme } from "$lib/utils.js";
	import { setMode } from "mode-watcher"

	let {
		class: className,
		defaultTheme,
		children,
	}: PrimitiveDivAttributes & { defaultTheme?: string } = $props();

	config.subscribe((val) => {
		setMode(val.lightMode)
	})
</script>

<div
	class={cn(`theme-${defaultTheme || $config.theme}`, "w-full", className)}
	data-style="nova"
	style="--radius: {defaultTheme ? 0.5 : $config.radius}rem"
>
	{@render children?.()}
</div>
