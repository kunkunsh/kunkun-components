<script setup lang="ts">
import { cn } from "@/lib/utils"
import {
	MenubarRoot,
	useForwardPropsEmits,
	type MenubarRootEmits,
	type MenubarRootProps
} from "radix-vue"
import { computed, type HTMLAttributes } from "vue"

const props = defineProps<MenubarRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<MenubarRootEmits>()

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props

	return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<MenubarRoot
		v-bind="forwarded"
		:class="
			cn(
				'bg-background flex h-9 items-center space-x-1 rounded-md border p-1 shadow-sm',
				props.class
			)
		"
	>
		<slot />
	</MenubarRoot>
</template>
