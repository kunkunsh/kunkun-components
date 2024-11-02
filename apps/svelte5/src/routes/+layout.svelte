<script lang="ts">
	import "../app.css";
	import "@kksh/svelte5/themes"
	import {ModeWatcher} from '@kksh/svelte5'
	
	const {children} = $props()
</script>

<ModeWatcher/>
{@render children?.()}
