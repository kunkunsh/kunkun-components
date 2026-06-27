---
name: kunkun-package-usage
description: Use when working in the kunkun-components repo and the user asks how to install, import, style, build, demo, migrate, or debug usage of @kksh/react, @kksh/vue, @kksh/svelte5, or the legacy @kksh/svelte package.
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

`@kksh/svelte5` currently does not export `./css`; the consuming SvelteKit app owns the Tailwind v4 entry and base tokens.

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

Install/use with Svelte peers:

```bash
pnpm add @kksh/svelte5 svelte lucide-svelte svelte-sonner
```

Typical layout and component usage:

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "../app.css";
  import "@kksh/svelte5/themes";
  import { ModeWatcher } from "@kksh/svelte5";

  const { children } = $props();
</script>

<ModeWatcher />
{@render children?.()}
```

```svelte
<!-- any page/component -->
<script lang="ts">
  import { Button, ThemeWrapper, Accordion } from "@kksh/svelte5";
</script>

<ThemeWrapper>
  <Button>Hello</Button>
  <Accordion.Root type="single">
    <!-- accordion items -->
  </Accordion.Root>
</ThemeWrapper>
```

When adding shadcn-svelte components, work from `packages/svelte5`, respect `packages/svelte5/components.json`, and use the current shadcn-svelte CLI/docs. New public components should be exported from `packages/svelte5/src/lib/index.ts`.

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
- Svelte 5 style issues should be checked in `apps/svelte5/src/app.css` and `apps/svelte5/src/routes/+layout.svelte`; there is no `@kksh/svelte5/css` export to import.
