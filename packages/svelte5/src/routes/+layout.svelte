<script lang="ts">
	import { updateTheme } from "@/utils.js"
	import "../app.css"
	import { Toaster } from "@kksh/svelte5/components/ui/sonner/index.js"
	import "../lib/registry/themes.css"
	import { config } from "@kksh/svelte5/stores/config.js"
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

