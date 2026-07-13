# @kksh/svelte5

## Installation

```bash
pnpm add @kksh/svelte5
```

### CSS Setup (required)

Import the base stylesheet in your Tailwind entry CSS, immediately after
`@import 'tailwindcss'`:

```css
@import 'tailwindcss';
@import '@kksh/svelte5/tailwind.css';
```

This registers the `@custom-variant` definitions (`data-checked`, `data-open`,
`data-horizontal`, …) that the components rely on. Without it, stateful
components such as `Switch` and `Slider` render blank — bits-ui emits
`data-state` / `data-orientation`, and the variants bridge to them.

### Tailwind Content Configuration

Also configure `tailwind.config.ts` so Tailwind scans the (published) component
classes:

```ts
content: [
    ...
    "./node_modules/@kksh/svelte5/dist/**/*.{html,js,svelte,ts}"
],
```

### Peer Dependencies

Make sure the following packages are also installed

- lucide-svelte
- svelte-sonner
