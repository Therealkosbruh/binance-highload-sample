"use client";
import { useEffect } from "react";
import { useTickerStore } from "@/entities/ticker/model";
import { useWSStatusStore } from "@/entities/ws-status/model";
import type { BinanceMiniTicker, BinanceStreamMessage } from "@/shared/types/types";
import { tickerWS } from "@/shared/ws/BinanceWSManager";
import { MINI_TICKER_STREAM_URL } from "@/shared/ws/streams";

export default function ConnectTicker() {
	const updateTickers = useTickerStore((state) => state.updateTickers);

	useEffect(() => {
		const handle = (msg: BinanceStreamMessage) => {
			updateTickers([msg as BinanceMiniTicker]);
		};

		tickerWS.on("24hrMiniTicker", handle);
		tickerWS.connect(
			MINI_TICKER_STREAM_URL,
			() => useWSStatusStore.getState().setTickerConnected(true),
			() => useWSStatusStore.getState().setTickerConnected(false),
		);

		return () => {
			tickerWS.off("24hrMiniTicker");
			tickerWS.disconnect();
			useWSStatusStore.getState().setTickerConnected(false);
		};
	}, [updateTickers]);

	return null;
}
