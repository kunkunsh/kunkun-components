<!--
  Root layout template for a @kksh/svelte5 consumer (SvelteKit).

  Three pieces, in order:
    1. `import '../app.css'`          — your Tailwind entry (see app.css template).
    2. `import '@kksh/svelte5/themes'` — the theme-color registry CSS. Without it,
       the `theme-*` classes carry no color tokens. Requires the ambient.d.ts
       shim so svelte-check doesn't choke on the CSS-only import.
    3. Runtime providers below.

  ModeWatcher is required for light/dark to work (it toggles the `.dark` class
  from the OS preference / your toggle). Toaster and ThemeWrapper are optional:
  add Toaster if you use svelte-sonner toasts; wrap children in ThemeWrapper if
  you want a named color theme (it applies the `theme-*` class the registry
  styles). Drop either if you don't need it.
-->
<script lang="ts">
	import '../app.css';
	import '@kksh/svelte5/themes';
	import { ModeWatcher, Toaster, ThemeWrapper } from '@kksh/svelte5';

	const { children } = $props();
</script>

<ModeWatcher />
<Toaster />
<ThemeWrapper>
	{@render children?.()}
</ThemeWrapper>
