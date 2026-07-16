# @kksh/svelte5

## Installation

```bash
pnpm add @kksh/svelte5
```

### CSS Setup (required)

Import the base stylesheet in your Tailwind entry CSS, immediately after
`@import 'tailwindcss'`:

```css
@import "tailwindcss";
@import "@kksh/svelte5/tailwind.css";
```

This registers the `@custom-variant` definitions (`data-checked`, `data-open`,
`data-horizontal`, …) that the components rely on. Without it, stateful
components such as `Switch` and `Slider` render blank — bits-ui emits
`data-state` / `data-orientation`, and the variants bridge to them.

### Tailwind v4 source scan

Tailwind v4 ignores `node_modules` by default. In the same stylesheet, register
the published component output with `@source` (the path is relative to the CSS
file):

```css
@source '../node_modules/@kksh/svelte5/dist';
```

No `tailwind.config.ts` is required for this setup. Use `@theme` in CSS for
application tokens; the Svelte 5 demo is the working reference.

### Peer Dependencies

Make sure the following packages are also installed

- lucide-svelte
- svelte-sonner
