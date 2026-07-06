# @kksh/svelte5

## 0.2.1

### Patch Changes

- Export the `InputGroup` and `InputOTP` components from the package barrel. Both
  component sets already shipped in `dist/`, but were never re-exported from
  `src/lib/index.ts`, so `import { InputGroup } from "@kksh/svelte5"` (and
  `InputOTP`) did not work.

## 0.1.14

### Patch Changes

- Upgrade paneforge to "next" to fix resizable

## 0.1.13

### Patch Changes

- Add more color variants for alert

## 0.1.11

### Patch Changes

- Upgrade dependencies version

## 0.1.1

### Patch Changes

- Experiment publishing @kksh/svelte5 source directly instead of compiling to js first

## 0.1.0

### Patch Changes

- Add @kksh/svelte5 with svelte 5 support and sv5 support for shadcn-svelte
