<script lang="ts">
	import { updateTheme } from "@/utils.js"
	import "../app.css"
	import { Toaster } from "$lib/components/ui/sonner/index.js"
	import "../lib/registry/themes.css"
	import { config } from "$lib/stores/config.js"
	import { ModeWatcher } from "mode-watcher"

	let { children } = $props();
	$effect(() => {
		// updateTheme($config)
		// console.log($config);
		// refresh
	})
</script>

<Toaster richColors />
<ModeWatcher />

{@render children()}

