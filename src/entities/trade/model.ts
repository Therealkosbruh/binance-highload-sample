import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { BinanceTrade } from "@/shared/types/types";

const MAX_TRADES = 100;

interface TradeState {
	trades: BinanceTrade[];
	addTrades: (incoming: BinanceTrade[]) => void;
	reset: () => void;
}

export const useTradeStore = create<TradeState>()(
	devtools(
		(set) => ({
			trades: [],
			addTrades: (incoming) =>
				set((state) => ({
					trades: [...incoming, ...state.trades].slice(0, MAX_TRADES),
				})),
			reset: () => set({ trades: [] }),
		}),
		{ name: "Trade" },
	),
);
