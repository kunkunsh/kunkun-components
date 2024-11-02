import { persisted } from "svelte-persisted-store"
import type { Style } from "@kksh/svelte5/registry/styles.ts"
import type { Theme } from "@kksh/svelte5/registry/themes.ts"
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
