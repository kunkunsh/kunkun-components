import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), vue({ include: [/\.vue$/] })],
	resolve: {
		alias: {
			"@kksh/vue/css": path.resolve(__dirname, "../../packages/vue/src/assets/index.css"),
			"@kksh/vue/themes": path.resolve(__dirname, "../../packages/vue/src/assets/themes.css"),
			"@kksh/vue": path.resolve(__dirname, "../../packages/vue/src/index.ts"),
			"@": path.resolve(__dirname, "../../packages/vue/src")
		}
	}
})
