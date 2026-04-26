"use client";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { usePairStore } from "@/entities/pair/model";
import AddPairPopup from "@/features/add-pair/AddPairPopup";
import PairItem from "./PairItem";
import styles from "./Sidebar.module.scss";
import WatchlistItem from "./WatchlistItem";

const POPULAR_PAIRS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"];

export default function Sidebar() {
	const { pair: activePair } = useParams<{ pair: string }>();
	const [showPopup, setShowPopup] = useState(false);
	const watchlist = usePairStore((s) => s.watchlist);
	const addActiveTab = usePairStore((s) => s.addActiveTab);
	const removeFromWatchlist = usePairStore((s) => s.removeFromWatchlist);

	const userPairs = watchlist.filter((p) => !POPULAR_PAIRS.includes(p));

	const handleActivate = useCallback(
		(pair: string) => {
			addActiveTab(pair);
		},
		[addActiveTab],
	);

	const handleRemove = useCallback(
		(pair: string) => {
			removeFromWatchlist(pair);
		},
		[removeFromWatchlist],
	);

	return (
		<aside className={styles.sidebar}>
			<div className={styles.section}>
				<span className={styles.sectionLabel}>Markets</span>
				<div className={styles.marketGrid}>
					{POPULAR_PAIRS.map((pair) => (
						<PairItem
							key={pair}
							pair={pair}
							isActive={pair === activePair}
							onActivate={handleActivate}
						/>
					))}
				</div>
			</div>

			{userPairs.length > 0 && (
				<div className={styles.section}>
					<span className={styles.sectionLabel}>Watchlist</span>
					{userPairs.map((pair) => (
						<WatchlistItem
							key={pair}
							pair={pair}
							isActive={pair === activePair}
							onActivate={handleActivate}
							onRemove={handleRemove}
						/>
					))}
				</div>
			)}

			<div className={styles.addRow}>
				<button type="button" className={styles.addBtn} onClick={() => setShowPopup(true)}>
					+ Add pair
				</button>
			</div>

			{showPopup && <AddPairPopup onClose={() => setShowPopup(false)} />}
		</aside>
	);
}
