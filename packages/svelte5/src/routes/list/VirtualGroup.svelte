<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.ts"
	import type { Item } from "./utils.ts"
	import { getContext, onMount } from "svelte"
	import { createVirtualizer, type VirtualItem } from "@tanstack/svelte-virtual"
	import Fuse from "fuse.js"

	let {
		heading,
		items,
		parentRef,
		searchTerm,
		sectionHeight = $bindable(0),
		sectionRef = $bindable(null),
		scrollMargin = $bindable(0)
	}: {
		heading: string
		items: Item[]
		sectionHeight: number
		searchTerm: string
		parentRef: HTMLDivElement | null
		sectionRef: HTMLDivElement | null
		scrollMargin: number
	} = $props()

	const fuse = new Fuse(items, {
		includeScore: true,
		threshold: 0.2,
		keys: ["name"]
	})

	const itemHeight = getContext<number>("itemHeight") ?? 30

	let virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
		count: items.length,
		getScrollElement: () => parentRef,
		estimateSize: () => itemHeight,
		overscan: 5
	})
	let virtualItems: VirtualItem[] = $state([])
	let itemsTotalSize = $state(0)

	let resultingItems = $derived.by(() => {
		void searchTerm
		return searchTerm.length > 0 ? fuse.search(searchTerm).map((item) => item.item) : items
	})

	$effect(() => {
		$virtualizer.setOptions({
			count: items.length,
			scrollMargin
		})
		virtualItems = $virtualizer.getVirtualItems()
		fuse.setCollection(items)
		itemsTotalSize = $virtualizer.getTotalSize()
	})
	// let groupHeight = $derived(itemsTotalSize + itemHeight)
	$effect(() => {
		sectionHeight = itemsTotalSize + itemHeight
	})
	let useVirtual = $state(true)
</script>

<Command.Group
	heading={`${heading} (${items.length})`}
	bind:ref={sectionRef}
	class="relative"
	style="height: {sectionHeight}px;"
>
	{#if !useVirtual}
		{#each items as item, index}
			<Command.Item>{index}: {item.name}</Command.Item>
		{/each}
	{:else}
		{#each virtualItems as row (row.index)}
			<Command.Item
				style="position: absolute; top: 0; left: 0; width: 100%; height: {row.size}px; transform: translateY({row.start -
					scrollMargin +
					30}px);"
			>
				<span>{row.index}: {resultingItems[row.index]?.name}</span>
			</Command.Item>
		{/each}
	{/if}
</Command.Group>
