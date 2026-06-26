import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { HTMLAttributes } from "svelte/elements";
import type { ThemeConfig } from "./components/theme/types.js";
import { config as themeConfig } from "./stores/config.js";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
export type PrimitiveDivAttributes = WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function updateTheme(config: ThemeConfig) {
	themeConfig.set(config);
}
