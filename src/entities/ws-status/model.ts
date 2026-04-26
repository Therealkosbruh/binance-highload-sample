import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface WSStatusState {
	pairConnected: boolean;
	tickerConnected: boolean;
	setPairConnected: (v: boolean) => void;
	setTickerConnected: (v: boolean) => void;
}

export const useWSStatusStore = create<WSStatusState>()(
	devtools(
		(set) => ({
			pairConnected: false,
			tickerConnected: false,
			setPairConnected: (v) => set({ pairConnected: v }),
			setTickerConnected: (v) => set({ tickerConnected: v }),
		}),
		{ name: "WSStatus" },
	),
);
