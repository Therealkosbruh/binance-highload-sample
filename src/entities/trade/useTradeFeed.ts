import { useEffect } from "react";
import { getBinanceTrades } from "@/entities/trade/api";
import { useTradeStore } from "@/entities/trade/model";

export default function useTradeFeed(symbol: string) {
	const addTrades = useTradeStore((state) => state.addTrades);
	const reset = useTradeStore((state) => state.reset);

	useEffect(() => {
		reset();
		const controller = new AbortController();
		(async () => {
			try {
				const trades = await getBinanceTrades(symbol, controller.signal);
				addTrades(trades);
			} catch {
					// 
			}
		})();
		return () => controller.abort();
	}, [symbol, addTrades, reset]);
}
