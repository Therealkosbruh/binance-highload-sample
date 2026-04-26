"use client";

import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useOrderBookStore } from "@/entities/order-book/model";
import useOrderBook from "@/entities/order-book/useOrderBook";
import { usePairStore } from "@/entities/pair/model";
import type { DepthLimit } from "@/shared/types/types";
import styles from "./OrderBook.module.scss";

interface OrderBookProps {
	pair: string;
}

const DEPTH_OPTIONS = [20, 50, 100] as const;

export default function OrderBook({ pair }: OrderBookProps) {
	const { bids, asks, spread } = useOrderBookStore(
		useShallow((s) => ({ bids: s.bids, asks: s.asks, spread: s.spread })),
	);
	const { depthLimit, setDepthLimit } = usePairStore(
		useShallow((s) => ({ depthLimit: s.depthLimit, setDepthLimit: s.setDepthLimit })),
	);

	useOrderBook(pair);

	const handleDepthChange = useCallback(
		(limit: DepthLimit) => () => setDepthLimit(limit),
		[setDepthLimit],
	);

	const visibleBids = useMemo(() => bids.slice(0, depthLimit), [bids, depthLimit]);
	const visibleAsks = useMemo(() => asks.slice(0, depthLimit).reverse(), [asks, depthLimit]);

	const bidsWithTotal = useMemo(() => {
		let cum = 0;
		return visibleBids.map(([price, qty]) => {
			cum += parseFloat(qty);
			return { price, qty, total: cum };
		});
	}, [visibleBids]);

	const asksWithTotal = useMemo(() => {
		const totals: number[] = [];
		let cum = 0;
		for (let i = visibleAsks.length - 1; i >= 0; i--) {
			const entry = visibleAsks[i];
			cum += parseFloat(entry?.[1] ?? "0");
			totals[i] = cum;
		}
		return visibleAsks.map((entry, i) => ({
			price: entry[0],
			qty: entry[1],
			total: totals[i] ?? 0,
		}));
	}, [visibleAsks]);

	const maxTotal = useMemo(() => {
		const lastBid = bidsWithTotal[bidsWithTotal.length - 1];
		const firstAsk = asksWithTotal[0];
		return Math.max(lastBid?.total ?? 0, firstAsk?.total ?? 0, 1);
	}, [bidsWithTotal, asksWithTotal]);

	return (
		<div className={styles.container}>
			<div className={styles.depthRow}>
				<div className={styles.depthOptions}>
					{DEPTH_OPTIONS.map((limit) => (
						<button
							key={limit}
							type="button"
							className={depthLimit === limit ? styles.activeDepthOpt : styles.depthOpt}
							onClick={handleDepthChange(limit)}
						>
							{limit}
						</button>
					))}
				</div>
				<span className={styles.depthMeta}>0.01 grouping</span>
			</div>

			<div className={styles.bookHead}>
				<span>Price (USDT)</span>
				<span>Size (BTC)</span>
				<span>Total</span>
			</div>

			<div className={`${styles.bookRows} ${styles.asksRows}`}>
				{asksWithTotal.map(({ price, qty, total }) => (
					<div key={price} className={`${styles.bookRow} ${styles.askRow}`}>
						<span className={styles.bar} style={{ width: `${(total / maxTotal) * 100}%` }} />
						<span className={`${styles.price} ${styles.askPrice}`}>
							{parseFloat(price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
						</span>
						<span className={styles.size}>{parseFloat(qty).toFixed(4)}</span>
						<span className={styles.total}>{total.toFixed(4)}</span>
					</div>
				))}
			</div>

			<div className={styles.bookSpread}>
				<span className={styles.spreadSide}>Spread</span>
				<span className={styles.spreadVal}>{spread}</span>
				<span className={styles.spreadSide} />
			</div>

			<div className={styles.bookRows}>
				{bidsWithTotal.map(({ price, qty, total }) => (
					<div key={price} className={`${styles.bookRow} ${styles.bidRow}`}>
						<span className={styles.bar} style={{ width: `${(total / maxTotal) * 100}%` }} />
						<span className={`${styles.price} ${styles.bidPrice}`}>
							{parseFloat(price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
						</span>
						<span className={styles.size}>{parseFloat(qty).toFixed(4)}</span>
						<span className={styles.total}>{total.toFixed(4)}</span>
					</div>
				))}
			</div>
		</div>
	);
}
