import type { BinanceKlineEvent, CandleData } from "@/shared/types/types";

export function klineToCandle(k: BinanceKlineEvent["k"]): CandleData {
	return {
		time: k.t / 1000,
		open: parseFloat(k.o),
		high: parseFloat(k.h),
		low: parseFloat(k.l),
		close: parseFloat(k.c),
		volume: parseFloat(k.v),
	};
}
