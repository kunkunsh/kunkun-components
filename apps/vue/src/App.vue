<script setup lang="ts">
import {
	CalendarIcon,
	EnvelopeClosedIcon,
	FaceIcon,
	GearIcon,
	PersonIcon,
	RocketIcon
} from "@radix-icons/vue"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
	// ThemeCustomizer,
	updateTheme,
	Button,
	type ThemeConfig
} from "@kksh/vue"
import { onMounted, reactive, watch } from "vue"

// const themeConfig = reactive<ThemeConfig>({
// 	theme: "neutral",
// 	radius: 0.5,
// 	lightMode: "auto"
// })
// watch(themeConfig, (newVal, oldVal) => {
// 	updateTheme(newVal)
// })

onMounted(() => {
	updateTheme({
		theme: "red",
		radius: 0.5,
		lightMode: "auto"
	})
})
</script>

<template>
	<Button>Hello</Button>
	<!-- <ThemeCustomizer
		v-model:lightMode="themeConfig.lightMode"
		v-model:theme="themeConfig.theme"
		v-model:radius="themeConfig.radius"
	/> -->
	<Command class="max-w-[450px] rounded-lg border shadow-md">
		<CommandInput placeholder="Type a command or search..." />
		<CommandList>
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandGroup heading="Suggestions">
				<CommandItem value="Calendar">
					<CalendarIcon class="mr-2 h-4 w-4" />
					<span>Calendar</span>
				</CommandItem>
				<CommandItem value="Search Emoji">
					<FaceIcon class="mr-2 h-4 w-4" />
					<span>Search Emoji</span>
				</CommandItem>
				<CommandItem value="Launch">
					<RocketIcon class="mr-2 h-4 w-4" />
					<span>Launch</span>
				</CommandItem>
			</CommandGroup>
			<CommandSeparator />
			<CommandGroup heading="Settings">
				<CommandItem value="Profile">
					<PersonIcon class="mr-2 h-4 w-4" />
					<span>Profile</span>
					<CommandShortcut>⌘P</CommandShortcut>
				</CommandItem>
				<CommandItem value="Mail">
					<EnvelopeClosedIcon class="mr-2 h-4 w-4" />
					<span>Mail</span>
					<CommandShortcut>⌘B</CommandShortcut>
				</CommandItem>
				<CommandItem value="Settings">
					<GearIcon class="mr-2 h-4 w-4" />
					<span>Settings</span>
					<CommandShortcut>⌘S</CommandShortcut>
				</CommandItem>
			</CommandGroup>
		</CommandList>
	</Command>
</template>
