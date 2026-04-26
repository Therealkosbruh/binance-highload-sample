export const CHART_OPTIONS = {
	autoSize: true,
	layout: {
		background: { color: "transparent" },
		textColor: "rgba(255,255,255,0.35)",
		fontFamily: "JetBrains Mono, monospace",
		fontSize: 11,
	},
	grid: {
		vertLines: { color: "rgba(255,255,255,0.05)" },
		horzLines: { color: "rgba(255,255,255,0.05)" },
	},
	crosshair: { mode: 1 },
	rightPriceScale: { borderColor: "rgba(255,255,255,0.08)" },
	timeScale: {
		borderColor: "rgba(255,255,255,0.08)",
		timeVisible: true,
		secondsVisible: false,
	},
} as const;

export const CANDLESTICK_SERIES_OPTIONS = {
	upColor: "#4ade80",
	downColor: "#f87171",
	borderUpColor: "#4ade80",
	borderDownColor: "#f87171",
	wickUpColor: "#4ade80",
	wickDownColor: "#f87171",
} as const;
