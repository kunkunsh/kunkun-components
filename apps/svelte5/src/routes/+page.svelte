<script lang="ts">
	import Exp from "$lib/components/exp.svelte"
	import {
		Button,
		// ModeDropdown,
		// ModeToggle,
		// themeConfigStore,
		// ThemeCustomizer,
		ThemeWrapper,
		updateTheme
		// type ThemeConfig
	} from "@kksh/svelte5"
	import { onMount } from "svelte"
	// } from "$lib/components/ui/button"

	onMount(() => {
		// updateTheme({
		// 	radius: 0,
		// 	theme: "yellow",
		// 	lightMode: "light"
		// })
	})
</script>

<ThemeWrapper>
	<Button>Hello</Button>
	<Exp />
</ThemeWrapper>
