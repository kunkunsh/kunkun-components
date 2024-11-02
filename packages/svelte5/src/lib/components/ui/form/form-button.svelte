<script lang="ts">
	import * as Button from "@kksh/svelte5/components/ui/button/index.ts";

	let { ref = $bindable(null), ...restProps }: Button.Props = $props();
</script>

<Button.Root type="submit" bind:ref {...restProps} />
