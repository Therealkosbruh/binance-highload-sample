import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ChartInterval, DepthLimit } from "@/shared/types/types";

const MAX_TABS = 8;

interface PairState {
	selectedPair: string;
	depthLimit: DepthLimit;
	chartInterval: ChartInterval;
	watchlist: string[];
	activeTabs: string[];
	setSelectedPair: (pair: string) => void;
	setDepthLimit: (limit: DepthLimit) => void;
	setChartInterval: (interval: ChartInterval) => void;
	addToWatchlist: (pair: string) => void;
	removeFromWatchlist: (pair: string) => void;
	addActiveTab: (pair: string) => void;
	removeActiveTab: (pair: string) => void;
}

export const usePairStore = create<PairState>()(
	devtools(
		persist(
			(set) => ({
				selectedPair: "BTCUSDT",
				depthLimit: 20,
				chartInterval: "1m",
				watchlist: [],
				activeTabs: ["BTCUSDT"],
				setSelectedPair: (pair) => set({ selectedPair: pair }),
				setDepthLimit: (limit) => set({ depthLimit: limit }),
				setChartInterval: (interval) => set({ chartInterval: interval }),
				addToWatchlist: (pair) =>
					set((state) => ({
						watchlist: state.watchlist.includes(pair)
							? state.watchlist
							: [...state.watchlist, pair],
					})),
				removeFromWatchlist: (pair) =>
					set((state) => ({ watchlist: state.watchlist.filter((p) => p !== pair) })),
				addActiveTab: (pair) =>
					set((state) => ({
						activeTabs: [pair, ...state.activeTabs.filter((p) => p !== pair)].slice(0, MAX_TABS),
					})),
				removeActiveTab: (pair) =>
					set((state) => ({ activeTabs: state.activeTabs.filter((p) => p !== pair) })),
			}),
			{ name: "trading-preferences" },
		),
		{ name: "Pair" },
	),
);
