const WS_BASE = "wss://stream.binance.com:9443";

export function getPairStreamUrl(pair: string): string {
	const s = pair.toLowerCase();
	return `${WS_BASE}/stream?streams=${s}@depth@100ms/${s}@trade/${s}@kline_1m`;
}

export const MINI_TICKER_STREAM_URL = `${WS_BASE}/ws/!miniTicker@arr`;
