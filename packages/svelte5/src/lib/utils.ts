import { mode, setMode } from "mode-watcher"
import { config as themeConfig } from "@kksh/svelte5/stores/config.ts"
import type { HTMLAttributes } from "svelte/elements"
import type { WithElementRef } from "bits-ui"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ThemeConfig } from "./components/theme/types.ts"
import { get } from "svelte/store"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export type PrimitiveDivAttributes = WithElementRef<HTMLAttributes<HTMLDivElement>>

export function isBrowser() {
	return typeof document !== "undefined"
}

export function updateTheme(config: ThemeConfig) {
	themeConfig.set(config)
	// refreshTheme()
}

/**
 * Apply color and light theme to html body
 */
// export function refreshTheme() {
// 	if (!isBrowser()) {
// 		console.warn("Not in browser")
// 		return
// 	}
// 	document.body.classList.forEach((className) => {
// 		if (className.match(/^theme.*/)) {
// 			document.body.classList.remove(className)
// 		}
// 	})
// 	const themeConfigVal = get(themeConfig)
// 	setMode(themeConfigVal.lightMode === "auto" ? "dark" : themeConfigVal.lightMode)
// 	document.body.classList.add(`theme-${themeConfigVal.theme}`)
// }
