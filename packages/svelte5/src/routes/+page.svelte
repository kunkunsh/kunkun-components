<script lang="ts">
	import CommandDemo from "@/components/cmdk/demo.svelte"
	import { ThemeCustomizer, ThemeWrapper } from "@/components/theme/index.js"
	import type { ThemeConfig } from "@/components/theme/types.js"
	import { Button } from "@/components/ui/button/index.js"
	import { config as themeConfig } from "@kksh/svelte5/stores/config.js"
	import { get } from "svelte/store"
	import { type Selected } from "bits-ui"
	import { onMount } from "svelte"
	import { updateTheme } from "@/utils.js"

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
		<CommandDemo class="h-[30em] w-[45em]" />
	</div>
</ThemeWrapper>
