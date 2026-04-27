import type { Metadata } from "next";
import { buildFallbackMeta } from "@/shared/lib/buildMeta";
import DashboardIndexClient from "./_DashboardIndexClient";

export const metadata: Metadata = buildFallbackMeta();

export default function DashboardIndexPage() {
	return <DashboardIndexClient />;
}
