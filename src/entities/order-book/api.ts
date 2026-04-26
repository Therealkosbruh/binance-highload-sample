import binanceApi from "@/shared/api/binanceApi";
import type { BinanceDepthSnapshot } from "@/shared/types/types";

export async function getBinanceDepth(
	symbol: string,
	signal?: AbortSignal,
): Promise<BinanceDepthSnapshot> {
	try {
		return await binanceApi
			.get("depth", { searchParams: { symbol, limit: 100 }, signal })
			.json<BinanceDepthSnapshot>();
	} catch {
		throw new Error("Failed to fetch order book snapshot");
	}
}
