import { useEffect } from "react";
import { getBinanceKlines } from "@/entities/candle/api";
import { useCandleStore } from "@/entities/candle/model";
import type { BinanceRestKline, CandleData, ChartInterval } from "@/shared/types/types";

function toCandle(r: BinanceRestKline): CandleData {
	return {
		time: r[0] / 1000,
		open: parseFloat(r[1]),
		high: parseFloat(r[2]),
		low: parseFloat(r[3]),
		close: parseFloat(r[4]),
		volume: parseFloat(r[5]),
	};
}

export default function useCandlestick(symbol: string, interval: ChartInterval) {
	const setCandles = useCandleStore((state) => state.setCandles);
	const reset = useCandleStore((state) => state.reset);

	useEffect(() => {
		reset();
		const controller = new AbortController();
		(async () => {
			try {
				const raw = await getBinanceKlines(symbol, interval, 500, controller.signal);
				setCandles(raw.map(toCandle));
			} catch {
				//
			}
		})();
		return () => controller.abort();
	}, [symbol, interval, setCandles, reset]);
}
