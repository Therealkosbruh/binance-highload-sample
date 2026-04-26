import binanceApi from "@/shared/api/binanceApi";

export interface SymbolEntry {
	symbol: string;
	base: string;
	quote: string;
}

const COMMON_QUOTES = ["USDT", "BUSD", "FDUSD", "USDC", "DAI", "BTC", "ETH", "BNB", "EUR", "TRY"];

let cache: SymbolEntry[] | null = null;

export async function loadSearchableSymbols(): Promise<SymbolEntry[]> {
	if (cache) return cache;
	const prices = await binanceApi.get("ticker/price").json<Array<{ symbol: string }>>();

	const result: SymbolEntry[] = [];
	for (const { symbol } of prices) {
		for (const quote of COMMON_QUOTES) {
			if (symbol.endsWith(quote) && symbol.length > quote.length) {
				result.push({ symbol, base: symbol.slice(0, -quote.length), quote });
				break;
			}
		}
	}
	cache = result;
	return result;
}
