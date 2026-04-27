"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePairStore } from "@/entities/pair/model";
import NoPairFallback from "@/widgets/NoPairFallback/NoPairFallback";
import Sidebar from "@/widgets/Sidebar/Sidebar";
import styles from "./page.module.scss";

export default function DashboardIndexClient() {
	const router = useRouter();
	const activeTabs = usePairStore((s) => s.activeTabs);

	useEffect(() => {
		const first = activeTabs[0];
		if (first) router.replace(`/dashboard/${first}`);
	}, [activeTabs, router]);

	if (activeTabs.length > 0) return null;

	return (
		<div className={styles.layout}>
			<Sidebar />
			<section className={styles.center}>
				<NoPairFallback />
			</section>
		</div>
	);
}
