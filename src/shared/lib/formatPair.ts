const QUOTES = ["USDT", "BUSD", "FDUSD", "USDC", "BTC", "ETH", "BNB", "EUR", "TRY", "DAI"];

export function formatPair(pair: string): string {
	for (const q of QUOTES) {
		if (pair.endsWith(q) && pair.length > q.length) {
			return `${pair.slice(0, -q.length)}/${q}`;
		}
	}
	return pair;
}
