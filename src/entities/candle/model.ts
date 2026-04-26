import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CandleData } from "@/shared/types/types";

interface CandleState {
	candles: CandleData[];
	version: number;
	setCandles: (data: CandleData[]) => void;
	updateCandle: (candle: CandleData) => void;
	reset: () => void;
}

const initialState = {
	candles: [] as CandleData[],
	version: 0,
};

export const useCandleStore = create<CandleState>()(
	devtools(
		(set) => ({
			...initialState,
			setCandles: (data) => set((state) => ({ candles: data, version: state.version + 1 })),
			updateCandle: (candle) =>
				set((state) => {
					const last = state.candles[state.candles.length - 1];
					if (last && last.time === candle.time) {
						return { candles: [...state.candles.slice(0, -1), candle] };
					}
					return { candles: [...state.candles, candle] };
				}),
			reset: () => set({ ...initialState }),
		}),
		{ name: "Candle" },
	),
);
