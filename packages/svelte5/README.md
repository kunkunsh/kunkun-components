# @kksh/svelte5

## Installation

```bash
pnpm add @kksh/svelte5
```

### Path Alias Configuration

Configure `svelte.config.js`

```js
import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			"@kksh/svelte5/*": "./node_modules/@kksh/svelte5/src/lib/*"
		}
	}
}

export default config
```

Also configure `tailwind.config.ts`

```ts
content: [
    ...
    "./node_modules/@kksh/svelte5/src/**/*.{html,js,svelte,ts}"
],
```

### Peer Dependencies

Make sure the following packages are also installed

- lucide-svelte
- svelte-sonner
