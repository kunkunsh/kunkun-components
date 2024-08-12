<script lang="ts">
	import "./app.css"
	import {
		Button,
		ModeDropdown,
		ModeToggle,
		themeConfigStore,
		ThemeCustomizer,
		ThemeWrapper,
		updateTheme,
		type ThemeConfig
	} from "@shadcn-components/svelte"
	import { ModeWatcher } from "mode-watcher"
	import { get } from "svelte/store"

	// init this config with persisted data from a persisted store in production, this is just a demo
	let config: ThemeConfig = {
		radius: get(themeConfigStore).radius,
		theme: get(themeConfigStore).theme,
		lightMode: get(themeConfigStore).lightMode
	}

	$: updateTheme(config)
</script>

<ModeWatcher />
<ThemeWrapper>
	<pre>{JSON.stringify(config, null, 2)}</pre>
	<ThemeCustomizer bind:config />
	<Button>Hello</Button>
	<ModeToggle />
</ThemeWrapper>
