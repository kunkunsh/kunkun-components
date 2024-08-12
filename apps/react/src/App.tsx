import {
	Button,
	CommandDemo,
	ThemeCustomizer,
	ThemeProvider,
	ThemeWrapper,
	TooltipProvider
} from "@shadcn-components/react"
import "@shadcn-components/react/css"
import "@shadcn-components/react/themes"

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<ThemeWrapper className="relative flex flex-col items-start md:flex-row md:items-center">
				<TooltipProvider>
					<ThemeCustomizer />
				</TooltipProvider>
			</ThemeWrapper>
			<ThemeWrapper>
				<Button>Hello</Button>
				<CommandDemo />
			</ThemeWrapper>
		</ThemeProvider>
	)
}

export default App
