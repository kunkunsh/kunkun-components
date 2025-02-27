<script lang="ts">
	import { getSections, getItems } from "./utils.js"
	import * as Command from "$lib/components/ui/command/index.ts"
	import { createVirtualizer, type VirtualItem } from "@tanstack/svelte-virtual"
	import VirtualGroup from "./VirtualGroup.svelte"
	import Fuse from "fuse.js"
	import { setContext } from "svelte"

	const itemHeight = 30
	setContext("itemHeight", itemHeight)

	const sections = $state(getSections(1))
	const items = getItems(1000)
	let searchTerm = $state("")
	let virtualListEl: HTMLDivElement | null = $state(null)
	const fuse = new Fuse(items, {
		includeScore: true,
		threshold: 0.2,
		keys: ["name"]
	})
	let resultingItems = $derived(
		// when search term changes, update the resulting items
		searchTerm.length > 0 ? fuse.search(searchTerm).map((item) => item.item) : items
	)

	// section total height is auto derived from section refs
	let sectionTotalHeight = $derived(sections.reduce((acc, s) => acc + (s.sectionHeight ?? 0), 0))
	// this should be a list of numbers, the first item is 0, the second item equal to first sectionRef.clientHeight, and so on
	let sectionsCummulativeHeight = $derived(
		sections.map((s, i) => sections.slice(0, i).reduce((acc, s) => acc + (s.sectionHeight ?? 0), 0))
	)

	let virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
		count: items.length,
		getScrollElement: () => virtualListEl,
		estimateSize: () => itemHeight,
		overscan: 5
	})

	let virtualItems: VirtualItem[] = $state([])
	let itemsTotalSize = $state(0)

	$effect(() => {
		void resultingItems
		$virtualizer.setOptions({ count: resultingItems.length, scrollMargin: sectionTotalHeight })
		virtualItems = $virtualizer.getVirtualItems()
		itemsTotalSize = $virtualizer.getTotalSize()
	})
</script>

<Command.Root shouldFilter={false}>
	<Command.Input placeholder="Search..." bind:value={searchTerm} />
	<Command.List bind:ref={virtualListEl}>
		<div style="position: relative; height: {itemsTotalSize + sectionTotalHeight}px; width: 100%;">
			{#each sections as section, i}
				<VirtualGroup
					heading={section.name}
					items={section.items}
					parentRef={virtualListEl}
					bind:sectionRef={section.sectionRef}
					scrollMargin={sectionsCummulativeHeight[i]}
					bind:sectionHeight={section.sectionHeight}
					{searchTerm}
				/>
			{/each}
			{#each virtualItems as row (row.index)}
				<Command.Item
					style="position: absolute; top: 0; left: 0; width: 100%; height: {row.size}px; transform: translateY({row.start}px);"
				>
					<span>{row.index}: {resultingItems[row.index]?.name}</span>
				</Command.Item>
			{/each}
		</div>
	</Command.List>
	<footer class="">hello</footer>
</Command.Root>
