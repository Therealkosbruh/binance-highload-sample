import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { BinanceMiniTicker } from "@/shared/types/types";

interface TickerState {
	tickers: Record<string, BinanceMiniTicker>;
	updateTickers: (incoming: BinanceMiniTicker[]) => void;
	reset: () => void;
}

export const useTickerStore = create<TickerState>()(
	devtools(
		(set) => ({
			tickers: {},
			updateTickers: (incoming) =>
				set((state) => {
					const next = { ...state.tickers };
					for (const ticker of incoming) {
						next[ticker.s] = ticker;
					}
					return { tickers: next };
				}),
			reset: () => set({ tickers: {} }),
		}),
		{ name: "Ticker" },
	),
);
