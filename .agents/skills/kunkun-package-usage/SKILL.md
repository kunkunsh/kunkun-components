---
name: kunkun-package-usage
description: Use when working in the kunkun-components repo (or consuming its published packages) and the user asks how to install, import, configure the Tailwind/CSS entry and theme tokens, style, build, demo, migrate, or debug usage of @kksh/react, @kksh/vue, @kksh/svelte5, or the legacy @kksh/svelte package. Reach for this especially when @kksh components render blank or unstyled, when wiring up the Tailwind v4 entry / @custom-variant bridge / theme registry, or when setting up a demo app — even if the user doesn't name the skill.
---

# Kunkun Package Usage

Use this skill to answer package-consumption questions or fix package/demo integration in this monorepo. Prefer the local `package.json`, `exports`, source entrypoints, and demo apps over stale README text. If the question depends on current third-party behavior for Tailwind, Svelte, shadcn, shadcn-vue, shadcn-svelte, Vite, or a framework CLI, fetch current docs with the repo's Context7/ctx7 instructions before answering.

## Package Map

- `packages/react` publishes `@kksh/react`; demo app is `apps/react` / `@kksh/react-demo`. It uses React 19 and Tailwind v4. Package exports include `.`, `./css`, and `./themes`.
- `packages/vue` publishes `@kksh/vue`; demo app is `apps/vue` / `@kksh/vue-demo`. It uses Vue 3 and Tailwind v4. Package exports include `.`, many component subpaths, `./css`, and `./themes`.
- `packages/svelte5` publishes `@kksh/svelte5`; demo app is `apps/svelte5` / `svelte5`. It uses Svelte 5, SvelteKit, and Tailwind v4. Package exports include `.`, `./utils`, and `./themes`.
- `packages/svelte` publishes `@kksh/svelte`; demo app is `apps/svelte` / `@kksh/svelte-demo`. This is the legacy Svelte 4 and Tailwind v3 package. Do not use it for new work unless the user explicitly asks for legacy Svelte.

## Style Rules

The package barrels are JS/TS component exports only. Do not rely on `import { Button } from "@kksh/react"` or similar imports to load CSS.

For normal published-package consumers of React:

```ts
import "@kksh/react/css";
import "@kksh/react/themes";
```

For normal published-package consumers of Vue:

```ts
import "@kksh/vue/css";
import "@kksh/vue/themes";
```

Place those CSS imports exactly once in the app's main entry or main CSS path. Do not also import a second full Tailwind entry unless the app is intentionally compiling package source.

For Svelte 5 consumers, import the theme registry separately and keep the app's own Tailwind/base CSS in `src/app.css`:

```svelte
<script lang="ts">
  import "../app.css";
  import "@kksh/svelte5/themes";
  import { ModeWatcher } from "@kksh/svelte5";
</script>

<ModeWatcher />
<slot />
```

`@kksh/svelte5` does not ship a full compiled CSS bundle the way React/Vue's `./css` does — the consuming SvelteKit app owns the Tailwind v4 entry and base tokens. But that entry MUST also `@import '@kksh/svelte5/tailwind.css'`, which registers the `@custom-variant` definitions the components depend on. Skipping it makes stateful components (Switch, Slider, dropdowns) render blank. See **Svelte 5 Usage** for the full setup.

For workspace demo apps that consume package source, use one Tailwind v4 entry that scans the demo and package source. React demo pattern in `apps/react/src/index.css`:

```css
@import "tailwindcss";
@source ".";
@source "../../../packages/react/src";
@import "../../../packages/react/src/theme.css";
@import "@kksh/react/themes";
```

Vue demo pattern in `apps/vue/src/index.css`:

```css
@import "tailwindcss";
@source ".";
@source "../../../packages/vue/src";
@import "../../../packages/vue/src/assets/theme.css";
@import "@kksh/vue/themes";
```

Do not mix `@import "@kksh/react/css"` or `@import "@kksh/vue/css"` with the workspace source-demo CSS above. That duplicates Tailwind/base output and can create obvious reset, border, or theme artifacts. If a demo has missing styles, first check that `@source` points at the matching package source and that the app Vite config includes `@tailwindcss/vite`.

## React Usage

Install/use with React peers:

```bash
pnpm add @kksh/react react react-dom
```

Typical component and theme usage:

```tsx
import {
  Button,
  CommandDemo,
  ThemeProvider,
  ThemeWrapper,
  TooltipProvider
} from "@kksh/react";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ThemeWrapper>
        <TooltipProvider>
          <Button>Hello</Button>
          <CommandDemo />
        </TooltipProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
```

When adding shadcn React components to the package, work from `packages/react`, respect `packages/react/components.json`, and use the current shadcn CLI/docs. After adding components, export them from `packages/react/src/index.ts` if they are part of the public API.

## Vue Usage

Install/use with Vue peer:

```bash
pnpm add @kksh/vue vue
```

Typical component and theme usage:

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { Button, Command, CommandInput, updateTheme } from "@kksh/vue";

onMounted(() => {
  updateTheme({
    theme: "red",
    radius: 0.5,
    lightMode: "auto"
  });
});
</script>

<template>
  <Button>Hello</Button>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
  </Command>
</template>
```

When adding shadcn-vue components to the package, work from `packages/vue`, respect `packages/vue/components.json`, and use the current shadcn-vue CLI/docs. Export public components from `packages/vue/src/index.ts` and add package subpath exports only when the component should be importable as `@kksh/vue/<component>`.

The Vue demo aliases `@kksh/vue`, `@kksh/vue/css`, and `@kksh/vue/themes` to package source in `apps/vue/vite.config.ts`. Keep those aliases in mind before assuming the demo is testing built `dist` output.

## Svelte 5 Usage

The canonical working consumer is the demo app `apps/svelte5`; every snippet
below is taken from it. Ready-to-copy templates live in this skill's
`assets/svelte5/` (`app.css`, `tailwind.config.ts`, `+layout.svelte`,
`ambient.d.ts`, `components.json`) — drop them into a fresh SvelteKit + Tailwind
v4 app and adjust paths. Requires Tailwind **v4** and Svelte **5**.

### 1. Install

`@kksh/svelte5` bundles its heavy runtime deps (bits-ui, mode-watcher, formsnap,
paneforge, embla-carousel, tanstack-table, …) as regular dependencies, so a
consumer adds only the peers plus the Tailwind v4 build toolchain:

```bash
# peers (runtime)
pnpm add @kksh/svelte5 svelte @lucide/svelte lucide-svelte svelte-sonner
# Tailwind v4 build toolchain (dev)
pnpm add -D tailwindcss @tailwindcss/vite tailwindcss-animate tailwind-merge tailwind-variants clsx
# only if you use date components
pnpm add -D @internationalized/date
```

Ensure `vite.config.ts` loads the Tailwind plugin: `plugins: [tailwindcss(), sveltekit()]`.

### 2. CSS entry — `src/app.css`

This is where setup most often goes wrong. Three imports, in order, then the
design tokens:

```css
@import 'tailwindcss';
@import '@kksh/svelte5/tailwind.css'; /* REQUIRED — registers component variants */
@config '../tailwind.config.ts';
/* …then the :root / .dark HSL token blocks (copy from assets/svelte5/app.css)… */
```

`@kksh/svelte5/tailwind.css` registers the `@custom-variant` definitions
(`data-checked`, `data-open`, `data-horizontal`, …) that the components style
themselves with. The underlying bits-ui primitives emit `data-state="checked"`
and `data-orientation="horizontal"`, and these variants bridge the bare class
names to those real attributes. **Omit this import and stateful components render
blank** — Slider tracks collapse to 0px, Switches show no track, dropdown
open/close animations don't fire. It is the single most common breakage, and the
reason a setup that "looks right" still shows empty controls.

Copy the full token block from `assets/svelte5/app.css` (shadcn `neutral` base,
both light `:root` and `.dark`). Without the tokens, `bg-primary`,
`border-border`, etc. resolve to nothing.

### 3. Tailwind config — `tailwind.config.ts`

Loaded via `@config` from `app.css`. The content glob must scan the published
package so its utility classes are emitted — and it must point at `dist`, not
`src` (only `dist` is published; a `src` glob silently matches nothing):

```ts
content: [
  './src/**/*.{html,js,svelte,ts}',
  './node_modules/@kksh/svelte5/dist/**/*.{html,js,svelte,ts}' // dist, not src
]
```

The `colors` map wires Tailwind color names to the `hsl(var(--…))` tokens defined
in `app.css`. Copy it wholesale from `assets/svelte5/tailwind.config.ts`.

### 4. Root layout — `src/routes/+layout.svelte`

```svelte
<script lang="ts">
  import '../app.css';
  import '@kksh/svelte5/themes'; // theme-color registry CSS (needs ambient.d.ts)
  import { ModeWatcher, Toaster, ThemeWrapper } from '@kksh/svelte5';
  const { children } = $props();
</script>

<ModeWatcher />
<Toaster />
<ThemeWrapper>{@render children?.()}</ThemeWrapper>
```

`ModeWatcher` drives light/dark (toggles the `.dark` class). `Toaster`
(svelte-sonner) and `ThemeWrapper` (applies the `theme-*` color class the
registry styles) are optional — drop them if unused.

### 5. Ambient types — `src/ambient.d.ts`

`@kksh/svelte5/themes` is a CSS-only import; svelte-check needs a module shim:

```ts
declare module '@kksh/svelte5/themes';
```

### 6. Use components

```svelte
<script lang="ts">
  import { Button, Switch, Slider } from '@kksh/svelte5';
  let checked = $state(false);
</script>

<Button>Hello</Button>
<Switch bind:checked />
<Slider type="single" value={50} min={0} max={100} step={1} />
```

### Adding new components to the package (`components.json`)

To add a shadcn-svelte component to the library itself, work from
`packages/svelte5`, respect its `components.json` (bundled here as
`assets/svelte5/components.json` — `style: nova`, `baseColor: neutral`,
`iconLibrary: lucide`, `$lib/components/ui` aliases), and use the current
shadcn-svelte CLI/docs. Export new public components from
`packages/svelte5/src/lib/index.ts`.

## Build And Verify

Use focused filters when touching one package:

```bash
pnpm --filter @kksh/react build
pnpm --filter @kksh/react-demo build
pnpm --filter @kksh/vue build
pnpm --filter @kksh/vue-demo build
pnpm --filter @kksh/svelte5 check
pnpm --filter @kksh/svelte5 build
pnpm --filter svelte5 build
```

Use `pnpm build` only when you need the full monorepo build. For visual CSS/debug work, run the affected demo app and inspect the rendered page, not just TypeScript output.

## Troubleshooting

- Missing styles in React/Vue demos usually means the Tailwind v4 `@source` path is not scanning package source or the Vite Tailwind plugin is missing.
- Overly bright borders or duplicated reset styles in React/Vue usually means the full package CSS (`@kksh/*/css`) and the app's own `@import "tailwindcss"` are both being compiled.
- Missing theme color classes usually means `@kksh/*/themes` is not imported or `ThemeWrapper`/`updateTheme` has not applied the `theme-*` class.
- Svelte 5 stateful components (Switch, Slider, Checkbox, RadioGroup, ToggleGroup, dropdowns) rendering blank/empty is almost always a missing `@import '@kksh/svelte5/tailwind.css'` in the Tailwind entry — the `@custom-variant` bridge is not registered, so `data-checked:`/`data-horizontal:` classes never match bits-ui's `data-state`/`data-orientation`. Confirm the import sits right after `@import 'tailwindcss'`.
- Svelte 5 components with NO styling at all (not even base colors) usually means the `tailwind.config.ts` content glob points at `@kksh/svelte5/src` instead of `@kksh/svelte5/dist` — only `dist` is published, so a `src` glob matches nothing and no utilities are emitted.
- A build error resolving `vaul-svelte` when using `Drawer`: `@kksh/svelte5`'s Drawer imports `vaul-svelte` but does not declare it. Add the Svelte 5 prerelease explicitly: `pnpm add vaul-svelte@1.0.0-next.7` (npm "latest" `0.3.x` is the Svelte 4 build and breaks).
- Other Svelte 5 style issues: check `apps/svelte5/src/app.css` and `apps/svelte5/src/routes/+layout.svelte` (the working reference), and confirm `ModeWatcher` is mounted so the `.dark` class toggles.
