---
name: kunkun-package-usage
description: Use when working in the kunkun-components repo (or consuming its published packages) and the user asks how to install, import, configure the Tailwind/CSS entry and theme tokens, style, build, demo, migrate, or debug usage of @kksh/react, @kksh/vue, @kksh/svelte5, or the legacy @kksh/svelte package. Reach for this especially when @kksh components render blank or unstyled, when wiring up the Tailwind v4 entry / @custom-variant bridge / theme registry, or when setting up a demo app — even if the user doesn't name the skill.
---

# Kunkun Package Usage

Use this skill for package-consumption questions or integration fixes in this monorepo. Prefer the local `package.json`, `exports`, source entrypoints, and demo apps over stale README text. When current third-party behavior matters, use the repo's Context7/ctx7 instructions before answering.

## Package map

- `packages/react` publishes `@kksh/react`; demo `apps/react`. Exports include `.`, `./css`, and `./themes`.
- `packages/vue` publishes `@kksh/vue`; demo `apps/vue`. Exports include `.`, component subpaths, `./css`, and `./themes`.
- `packages/svelte5` publishes `@kksh/svelte5`; demo `apps/svelte5`. It uses Svelte 5 and Tailwind v4. Exports include `.`, `./utils`, `./themes`, and `./tailwind.css`.
- `packages/svelte` publishes legacy `@kksh/svelte` (Svelte 4 + Tailwind v3). Do not use it for new work unless explicitly requested.

## CSS ownership

React and Vue consumers use their compiled CSS once in the app entry:

```ts
import '@kksh/react/css';
import '@kksh/react/themes';
// or
import '@kksh/vue/css';
import '@kksh/vue/themes';
```

Do not combine those full package CSS bundles with a second full Tailwind entry unless intentionally compiling package source.

Svelte 5 consumers own their Tailwind v4 entry. Starting with `@kksh/svelte5@0.2.2`, import the package bridge from that entry; it registers the variants and transition utilities used by the components.

Workspace demos compile source instead: use Tailwind `@source` paths to the matching package source and do not also import the published full CSS bundle.

## Svelte 5 setup

The canonical reference is `apps/svelte5`. Templates live in `assets/svelte5/` and are ready to copy into a fresh SvelteKit + Tailwind v4 app. The setup is CSS-first: do **not** create or load a `tailwind.config.ts`.

### 1. Install

```bash
pnpm add @kksh/svelte5@^0.2.2 svelte @lucide/svelte lucide-svelte svelte-sonner
pnpm add -D tailwindcss @tailwindcss/vite
```

`@kksh/svelte5` declares its direct runtime imports (including `tailwind-merge`, `tailwind-variants`, `sveltekit-superforms`, `vaul-svelte`, and `tailwindcss-animate`). Consumers do not add those separately just to use package components. Ensure `vite.config.ts` loads `tailwindcss()` before `sveltekit()`.

### 2. CSS entry — `src/app.css`

Start from `assets/svelte5/app.css`. Its important first section is:

```css
@import 'tailwindcss';
@import '@kksh/svelte5/tailwind.css';
@source '../node_modules/@kksh/svelte5/dist';

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  /* Copy the remaining mappings from assets/svelte5/app.css. */
}
```

Then copy the complete light `:root` and dark `.dark` token blocks from the asset. The `@source` must target published `dist`, not `src`; only `dist` exists in a consumer install.

The package bridge supplies `data-checked:`, `data-open:`, `data-horizontal:`, and related variants that map shadcn-svelte classes to bits-ui attributes. It also loads `tailwindcss-animate`. Without it, stateful components can appear transparent or collapse.

Keep the token blocks globally scoped (not only inside `ThemeWrapper`): menus, dialogs, and selects use portals under `body` and need `--popover`, `--border`, etc. there as well.

### 3. Root layout — `src/routes/+layout.svelte`

```svelte
<script lang="ts">
  import '../app.css';
  import '@kksh/svelte5/themes';
  import { ModeWatcher, Toaster, ThemeWrapper } from '@kksh/svelte5';

  const { children } = $props();
</script>

<ModeWatcher />
<Toaster />
<ThemeWrapper>{@render children?.()}</ThemeWrapper>
```

`ModeWatcher` toggles the global `.dark` class. `ThemeWrapper` and the registry CSS enable package color themes; `Toaster` is optional.

### 4. Ambient CSS type — `src/ambient.d.ts`

```ts
declare module '@kksh/svelte5/themes';
```

### 5. Use components

```svelte
<script lang="ts">
  import { Button, Select, Slider, Switch } from '@kksh/svelte5';

  let checked = $state(false);
  let value = $state(50);
</script>

<Button>Hello</Button>
<Switch bind:checked />
<Slider type="single" bind:value min={0} max={100} step={1} />
<Select.Root>
  <Select.Trigger>Select an option</Select.Trigger>
  <Select.Content>
    <Select.Item value="one">One</Select.Item>
  </Select.Content>
</Select.Root>
```

When adding components to the library, work in `packages/svelte5`, follow its `components.json`, export public additions from `src/lib/index.ts`, and add subpath exports only for intended public entrypoints.

## Build and verify

Use focused commands:

```bash
pnpm --filter @kksh/svelte5 check
pnpm --filter @kksh/svelte5 build
pnpm --filter svelte5 build
```

For visual CSS/debug work, run the affected demo and inspect a portal component such as Select, DropdownMenu, or Dialog in both modes. Type checking alone cannot catch missing globally-scoped portal tokens.

## Troubleshooting

- Svelte 5 controls render transparent, Switch/Slider state styles are missing, or Select animations fail: ensure `@import '@kksh/svelte5/tailwind.css'` follows `@import 'tailwindcss'`.
- Package component utilities are absent: ensure `@source '../node_modules/@kksh/svelte5/dist';` is present and points to `dist`.
- Portalled Select/Dropdown/Dialog content has transparent or wrong colors: keep the full `:root` and `.dark` token blocks global, because portal content is mounted under `body`.
- Theme color classes are missing: import `@kksh/svelte5/themes` and mount `ThemeWrapper` or call `updateTheme`.
- React/Vue missing styles: check their Tailwind v4 `@source` paths and Vite Tailwind plugin. Duplicate reset/border artifacts usually mean a package CSS bundle and another full Tailwind entry are both in use.
