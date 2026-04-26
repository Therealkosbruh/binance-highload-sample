"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { usePairStore } from "@/entities/pair/model";
import { formatPair } from "@/shared/lib/formatPair";
import styles from "./Topbar.module.scss";

export default function Topbar() {
	const { pair: activePair } = useParams<{ pair: string }>();
	const router = useRouter();

	const { activeTabs, removeActiveTab } = usePairStore(
		useShallow((s) => ({ activeTabs: s.activeTabs, removeActiveTab: s.removeActiveTab })),
	);

	const handleClose = useCallback(
		(pair: string) => (e: React.MouseEvent) => {
			e.preventDefault();
			const nextTabs = activeTabs.filter((p) => p !== pair);
			removeActiveTab(pair);
			if (pair === activePair) {
				router.push(nextTabs[0] ? `/dashboard/${nextTabs[0]}` : "/dashboard");
			}
		},
		[activeTabs, activePair, removeActiveTab, router],
	);

	return (
		<header className={styles.topbar}>
			<nav className={styles.pairTabs}>
				{activeTabs.map((pair) => (
					<div key={pair} className={pair === activePair ? styles.activeTab : styles.tab}>
						<Link href={`/dashboard/${pair}`} className={styles.tabLabel}>
							{formatPair(pair)}
						</Link>
						<button
							type="button"
							className={styles.tabClose}
							onClick={handleClose(pair)}
							aria-label={`Close ${pair}`}
						>
							×
						</button>
					</div>
				))}
			</nav>
			<div className={styles.topbarStats} />
		</header>
	);
}
