import type { Theme } from "$lib/registry/themes.js"

export type ThemeConfig = {
	theme: Theme["name"]
	radius: number
	lightMode: "system" | "light" | "dark"
}
