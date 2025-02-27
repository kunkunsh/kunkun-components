import { faker } from "@faker-js/faker"

export function generateId() {
	return Math.random().toString(36).substring(2, 15)
}

export type Item = {
	id: string
	name: string
	description: string
}

export type Section = {
	name: string
	items: Item[]
	sectionRef: HTMLDivElement | null
	sectionHeight: number
}

export function getItems(n: number = 10): Item[] {
	return Array.from({ length: n }, () => ({
		id: generateId(),
		name: faker.person.fullName(),
		description: faker.lorem.sentence()
	}))
}

export function getSections(n: number = 10): Section[] {
	return Array.from({ length: n }, () => ({
		name: faker.lorem.word(),
		items: getItems(3),
		sectionRef: null,
		sectionHeight: 0
	}))
}
