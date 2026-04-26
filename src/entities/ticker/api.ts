import binanceApi from "@/shared/api/binanceApi";
import type { BinanceTicker24h } from "@/shared/types/types";

export async function getBinanceTicker24h(
	symbol: string,
	signal?: AbortSignal,
): Promise<BinanceTicker24h> {
	try {
		return await binanceApi
			.get("ticker/24hr", { searchParams: { symbol }, signal })
			.json<BinanceTicker24h>();
	} catch {
		throw new Error("Failed to fetch 24h ticker");
	}
}
