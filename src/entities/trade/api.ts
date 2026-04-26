import binanceApi from "@/shared/api/binanceApi";
import type { BinanceRestTrade, BinanceTrade } from "@/shared/types/types";

export async function getBinanceTrades(
	symbol: string,
	signal?: AbortSignal,
): Promise<BinanceTrade[]> {
	try {
		const raw = await binanceApi
			.get("trades", { searchParams: { symbol, limit: 50 }, signal })
			.json<BinanceRestTrade[]>();
		return raw.map((t) => ({
			e: "trade" as const,
			t: t.id,
			s: symbol,
			p: t.price,
			q: t.qty,
			m: t.isBuyerMaker,
			T: t.time,
		}));
	} catch {
		throw new Error("Failed to fetch trades");
	}
}
