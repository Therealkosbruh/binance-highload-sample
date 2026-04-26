export interface BinanceTrade {
	e: "trade";
	t: number;
	s: string;
	p: string;
	q: string;
	m: boolean;
	T: number;
}

export interface BinanceRestTrade {
	id: number;
	price: string;
	qty: string;
	time: number;
	isBuyerMaker: boolean;
}

export type BinanceRestKline = [
	number, // open time
	string, // open
	string, // high
	string, // low
	string, // close
	string, // volume
	number, // close time
	string, // quote volume
	number, // trade count
	string, // taker buy base asset volume
	string, // taker buy quote asset volume
	string, // unused
];

export interface CandleData {
	time: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
}

export interface BinanceDepthUpdate {
	e: "depthUpdate";
	s: string;
	U: number;
	u: number;
	b: [string, string][];
	a: [string, string][];
}

export interface BinanceKlineData {
	t: number;
	T: number;
	o: string;
	h: string;
	l: string;
	c: string;
	v: string;
	x: boolean;
	i: string;
}

export interface BinanceKlineEvent {
	e: "kline";
	s: string;
	k: BinanceKlineData;
}

export interface BinanceMiniTicker {
	e: "24hrMiniTicker";
	s: string;
	c: string;
	o: string;
	h: string;
	l: string;
	v: string;
}

export interface BinanceDepthSnapshot {
	lastUpdateId: number;
	bids: [string, string][];
	asks: [string, string][];
}

export interface BinanceTicker24h {
	symbol: string;
	priceChange: string;
	priceChangePercent: string;
	lastPrice: string;
	highPrice: string;
	lowPrice: string;
	volume: string;
	quoteVolume: string;
}

export type ChartInterval = "1m" | "5m" | "15m" | "1h" | "4h" | "1d";
export type DepthLimit = 20 | 50 | 100;
export type BinanceStreamMessage =
	| BinanceTrade
	| BinanceDepthUpdate
	| BinanceKlineEvent
	| BinanceMiniTicker;
export type StreamHandler = (data: BinanceStreamMessage) => void;
