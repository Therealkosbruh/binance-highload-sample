import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { BinanceDepthSnapshot, BinanceDepthUpdate } from "@/shared/types/types";

interface OrderBookState {
	bids: [string, string][];
	asks: [string, string][];
	lastUpdateId: number;
	spread: string;
	setSnapshot: (data: BinanceDepthSnapshot) => void;
	applyDelta: (data: BinanceDepthUpdate) => void;
	reset: () => void;
}

function applyLevelUpdates(
	levels: [string, string][],
	updates: [string, string][],
): [string, string][] {
	const map = new Map(levels);
	for (const [price, qty] of updates) {
		if (qty === "0") map.delete(price);
		else map.set(price, qty);
	}
	return Array.from(map.entries());
}

const initialState = {
	bids: [] as [string, string][],
	asks: [] as [string, string][],
	lastUpdateId: 0,
	spread: "0",
};

export const useOrderBookStore = create<OrderBookState>()(
	devtools(
		(set) => ({
			...initialState,
			setSnapshot: (data) =>
				set({
					bids: data.bids,
					asks: data.asks,
					lastUpdateId: data.lastUpdateId,
				}),
			applyDelta: (update) =>
				set((state) => {
					if (state.lastUpdateId === 0) return state;
					if (update.u <= state.lastUpdateId) return state;

					const newBids = applyLevelUpdates(state.bids, update.b)
						.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
						.slice(0, 100);
					const newAsks = applyLevelUpdates(state.asks, update.a)
						.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
						.slice(0, 100);

					const topBid = newBids[0];
					const topAsk = newAsks[0];
					const spread =
						topBid && topAsk ? (parseFloat(topAsk[0]) - parseFloat(topBid[0])).toFixed(2) : "0";

					return { bids: newBids, asks: newAsks, lastUpdateId: update.u, spread };
				}),
			reset: () => set(initialState),
		}),
		{ name: "OrderBook" },
	),
);
