"use client";

import { useCallback, useState } from "react";
import { useTradeStore } from "@/entities/trade/model";
import OrderBook from "@/widgets/OrderBook/OrderBook";
import TradeFeed from "@/widgets/TradeFeed/TradeFeed";
import styles from "./RightPanel.module.scss";

interface RightPanelProps {
	pair: string;
}

type Panel = "book" | "feed";

export default function RightPanel({ pair }: RightPanelProps) {
	const [activePanel, setActivePanel] = useState<Panel>("book");
	const tradesCount = useTradeStore((s) => s.trades.length);

	const handleSwitch = useCallback((panel: Panel) => () => setActivePanel(panel), []);

	return (
		<aside className={styles.container}>
			<div className={styles.tabs}>
				<button
					type="button"
					className={activePanel === "book" ? styles.activeTab : styles.tab}
					onClick={handleSwitch("book")}
				>
					Order Book
				</button>
				<button
					type="button"
					className={activePanel === "feed" ? styles.activeTab : styles.tab}
					onClick={handleSwitch("feed")}
				>
					Trades
					{tradesCount > 0 && <span className={styles.count}>{tradesCount}</span>}
				</button>
			</div>
			<div className={activePanel === "book" ? styles.panelVisible : styles.panelHidden}>
				<OrderBook pair={pair} />
			</div>
			<div className={activePanel === "feed" ? styles.panelVisible : styles.panelHidden}>
				<TradeFeed pair={pair} />
			</div>
		</aside>
	);
}
