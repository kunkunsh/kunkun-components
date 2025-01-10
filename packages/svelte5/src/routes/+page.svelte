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
	import * as Alert from "$lib/components/ui/alert/index.js"
	import { Resizable } from "$lib/index.ts"
	onMount(() => {
		updateTheme({
			radius: 0,
			theme: "blue",
			lightMode: "dark"
		})
	})
</script>

<div class="h-96 border-2 border-red-500">
	<Resizable.PaneGroup direction="horizontal">
		<Resizable.Pane>One</Resizable.Pane>
		<Resizable.Handle />
		<Resizable.Pane>Two</Resizable.Pane>
	</Resizable.PaneGroup>
</div>

<ThemeCustomizer bind:config={$themeConfig} />
<ThemeWrapper>
	<pre>{JSON.stringify($themeConfig, null, 2)}</pre>
	<div class="flex flex-col gap-2 p-4">
		<div>
			<Button>Hello</Button>
		</div>
		<Alert.Root variant="error">
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>Your session has expired. Please login again.</Alert.Description>
		</Alert.Root>
		<Alert.Root variant="success">
			<Alert.Title>Success</Alert.Title>
			<Alert.Description>Your session has expired. Please login again.</Alert.Description>
		</Alert.Root>
		<Alert.Root variant="info">
			<Alert.Title>Info</Alert.Title>
			<Alert.Description>Your session has expired. Please login again.</Alert.Description>
		</Alert.Root>
	</div>
</ThemeWrapper>
