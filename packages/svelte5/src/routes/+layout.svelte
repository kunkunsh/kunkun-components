<script lang="ts">
	import { updateTheme } from "@/utils.ts"
	import "../app.css"
	import { Toaster } from "@kksh/svelte5/components/ui/sonner/index.ts"
	import "../lib/registry/themes.css"
	import { config } from "@kksh/svelte5/stores/config.ts"
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

