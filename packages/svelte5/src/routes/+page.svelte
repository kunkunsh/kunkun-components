<script lang="ts">
	// import CommandDemo from "$lib/components/cmdk/demo.svelte"
	import { ThemeCustomizer, ThemeWrapper } from "$lib/components/theme/index.ts"
	import type { ThemeConfig } from "$lib/components/theme/types.ts"
	import { Button } from "$lib/components/ui/button/index.ts"
	import { config as themeConfig } from "$lib/stores/config.js"
	import { get } from "svelte/store"
	import { type Selected } from "bits-ui"
	import { onMount } from "svelte"
	import { updateTheme } from "$lib/utils.js"

	onMount(() => {
		updateTheme({
			radius: 0,
			theme: "blue",
			lightMode: "light"
		})
	})
</script>

<ThemeCustomizer bind:config={$themeConfig} />
<ThemeWrapper>
	<pre>{JSON.stringify($themeConfig, null, 2)}</pre>
	<div class="flex flex-col gap-2 p-4">
		<div>
			<Button>Hello</Button>
		</div>
		<!-- <CommandDemo class="h-[30em] w-[45em]" /> -->
	</div>
</ThemeWrapper>
