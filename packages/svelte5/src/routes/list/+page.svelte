<script lang="ts">
	import { getSections, getItems } from "./utils.js"
	import * as Command from "$lib/components/ui/command/index.ts"
	import { createVirtualizer, type VirtualItem } from "@tanstack/svelte-virtual"
	import VirtualGroup from "./VirtualGroup.svelte"
	import { Inspect } from "svelte-inspect-value"
	import Fuse from "fuse.js"

	const sections = getSections()
	const items = getItems(1000)
	let searchTerm = $state("")
	let virtualListEl: HTMLDivElement | null = $state(null)

	const fuse = new Fuse(items, {
		includeScore: true,
		threshold: 0.2,
		keys: ["name"]
	})
	let resultingItems = $derived.by(() => {
		console.log("update resultingItems")
		void searchTerm
		return searchTerm.length > 0 ? fuse.search(searchTerm).map((item) => item.item) : items
	})
	$inspect(resultingItems)
	let virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
		count: items.length,
		getScrollElement: () => virtualListEl,
		estimateSize: () => 30,
		overscan: 5
	})

	$effect(() => {
		fuse.setCollection(items)
	})

	let virtualItems: VirtualItem[] = $state([])
	$effect(() => {
		void resultingItems
		$virtualizer.setOptions({ count: resultingItems.length })
		virtualItems = $virtualizer.getVirtualItems()
	})
</script>

<Command.Root shouldFilter={false}>
	<Command.Input placeholder="Search..." bind:value={searchTerm} />
	<Command.List bind:ref={virtualListEl} class="border border-blue-500">
		<!-- {#each sections as section}
			<Command.Group heading={section.name}>
				{#each section.items as item}
					<Command.Item>{item.name}</Command.Item>
				{/each}
			</Command.Group>
		{/each} -->

		<div class="" style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;">
			{#each virtualItems as row (row.index)}
				<Command.Item
					style="position: absolute; top: 0; left: 0; width: 100%; height: {row.size}px; transform: translateY({row.start}px);"
					class="itemitem"
				>
					<span>{row.index}: {resultingItems[row.index]?.name}</span>
				</Command.Item>
			{/each}
		</div>

		<!-- {#each items as item}
			<Command.Item>{item.name}</Command.Item>
		{/each} -->
	</Command.List>
	<!-- <footer class="">hello</footer> -->
</Command.Root>
<!-- <Inspect name="resultingItems" value={resultingItems} /> -->
