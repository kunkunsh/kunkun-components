import type { Theme } from "@/registry/themes.ts"

export type ThemeConfig = {
	theme: Theme["name"]
	radius: number
	lightMode: "auto" | "light" | "dark"
}
