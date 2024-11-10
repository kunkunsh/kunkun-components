import { persisted } from "svelte-persisted-store"
import type { Style } from "$lib/registry/styles.ts"
import type { Theme } from "$lib/registry/themes.ts"
import { writable } from "svelte/store"

type Config = {
	theme: Theme["name"]
	radius: number
	lightMode: "auto" | "light" | "dark"
}

export const config = writable<Config>({
	theme: "zinc",
	radius: 0.5,
	lightMode: "auto"
})
