import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"

const packageDirectory = new URL("./", import.meta.url)

test("declares the consumer-facing Tailwind bridge and its runtime dependencies", async () => {
	const manifest = JSON.parse(await readFile(new URL("./package.json", packageDirectory), "utf8"))
	const tailwindBridge = await readFile(new URL("./src/lib/tailwind.css", packageDirectory), "utf8")

	assert.equal(manifest.exports["./tailwind.css"], "./dist/tailwind.css")
	assert.match(tailwindBridge, /@plugin ['"]tailwindcss-animate['"];/)

	for (const dependency of [
		"clsx",
		"sveltekit-superforms",
		"tailwind-merge",
		"tailwind-variants",
		"vaul-svelte"
	]) {
		assert.ok(manifest.dependencies[dependency], `${dependency} must be a runtime dependency`)
	}
})
