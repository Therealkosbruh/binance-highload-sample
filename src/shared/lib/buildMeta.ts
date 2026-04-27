import type { Metadata } from "next";
import seo from "@/shared/config/seo.json";

function fill(template: string, vars: Record<string, string>): string {
	return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

function shape(title: string, description: string): Metadata {
	return {
		title,
		description,
		openGraph: { title, description },
		twitter: { title, description },
	};
}

export function buildPairMeta(label: string): Metadata {
	const title = fill(seo.pages.pair.title, { label });
	const description = fill(seo.pages.pair.description, { label });
	return shape(title, description);
}

export function buildFallbackMeta(): Metadata {
	const { title, description } = seo.pages.fallback;
	return shape(title, description);
}
