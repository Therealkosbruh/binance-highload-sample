import binanceApi from "@/shared/api/binanceApi";
import type { BinanceRestKline, ChartInterval } from "@/shared/types/types";

export async function getBinanceKlines(
	symbol: string,
	interval: ChartInterval,
	limit = 500,
	signal?: AbortSignal,
): Promise<BinanceRestKline[]> {
	try {
		return await binanceApi
			.get("klines", { searchParams: { symbol, interval, limit }, signal })
			.json<BinanceRestKline[]>();
	} catch {
		throw new Error("Failed to fetch klines");
	}
}
