import path from "path"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { dependencies, peerDependencies } from "./package.json"

const uiComponents = [
	"accordion",
	"alert",
	"alert-dialog",
	"aspect-ratio",
	"auto-form",
	"avatar",
	"badge",
	"breadcrumb",
	"button",
	"button-group",
	"calendar",
	"card",
	"carousel",
	"chart",
	"chart-area",
	"chart-bar",
	"chart-donut",
	"chart-line",
	"checkbox",
	"collapsible",
	"combobox",
	"command",
	"command-extra",
	"context-menu",
	"dialog",
	"drawer",
	"dropdown-menu",
	"empty",
	"field",
	"form",
	"hover-card",
	"input",
	"input-group",
	"input-otp",
	"item",
	"kbd",
	"label",
	"menubar",
	"native-select",
	"navigation-menu",
	"number-field",
	"pagination",
	"pin-input",
	"popover",
	"progress",
	"radio-group",
	"range-calendar",
	"resizable",
	"scroll-area",
	"select",
	"separator",
	"sheet",
	"sidebar",
	"skeleton",
	"slider",
	"sonner",
	"spinner",
	"stepper",
	"switch",
	"table",
	"tabs",
	"tags-input",
	"textarea",
	"toggle",
	"toggle-group",
	"tooltip",
	"v-calendar"
]

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: [
				"./src/index.ts",
				"./src/style-entry.ts",
				"./src/components/command-extra/index.ts",
				...uiComponents.map((component) => `./src/components/ui/${component}/index.ts`)
				// "./src/components/ui/button/index.ts",
				// "./src/components/ui/command/index.ts"
			],
			// entry: ["./src/index.ts", "./src/dev.ts"],
			name: "@kksh/vue",
			formats: ["es", "cjs"],
			cssFileName: "style"
		},
		rollupOptions: {
			external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
				exports: "named"
			}
		},
		sourcemap: true,
		emptyOutDir: true,
		chunkSizeWarningLimit: 500
	},
	plugins: [
		tailwindcss(),
		vue(),
		dts({
			include: ["src/**/*"]
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	}
})
