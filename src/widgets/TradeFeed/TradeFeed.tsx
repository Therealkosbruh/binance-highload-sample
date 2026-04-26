"use client";

import { useTradeStore } from "@/entities/trade/model";
import useTradeFeed from "@/entities/trade/useTradeFeed";
import { formatTime } from "@/shared/lib/formatTime";
import styles from "./TradeFeed.module.scss";

interface TradeFeedProps {
	pair: string;
}

export default function TradeFeed({ pair }: TradeFeedProps) {
	const trades = useTradeStore((state) => state.trades);

	useTradeFeed(pair);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span>Trade History</span>
			</div>
			<div className={styles.colLabels}>
				<span>Time</span>
				<span>Price</span>
				<span className={styles.right}>Amount</span>
			</div>
			<div className={styles.list}>
				{trades.map((trade) => (
					<div key={trade.t} className={trade.m ? styles.sellRow : styles.buyRow}>
						<span className={styles.time}>{formatTime(trade.T)}</span>
						<span className={trade.m ? styles.sellPrice : styles.buyPrice}>
							{parseFloat(trade.p).toLocaleString("en-US", { minimumFractionDigits: 2 })}
						</span>
						<span className={styles.right}>{parseFloat(trade.q).toFixed(4)}</span>
					</div>
				))}
			</div>
		</div>
	);
}
