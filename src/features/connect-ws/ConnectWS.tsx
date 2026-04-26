"use client";
import { useEffect } from "react";
import { klineToCandle } from "@/entities/candle/klineToCandle";
import { useCandleStore } from "@/entities/candle/model";
import { useOrderBookStore } from "@/entities/order-book/model";
import { usePairStore } from "@/entities/pair/model";
import { useTradeStore } from "@/entities/trade/model";
import { useWSStatusStore } from "@/entities/ws-status/model";
import type {
	BinanceDepthUpdate,
	BinanceKlineEvent,
	BinanceStreamMessage,
	BinanceTrade,
} from "@/shared/types/types";
import { binanceWS } from "@/shared/ws/BinanceWSManager";
import { getPairStreamUrl } from "@/shared/ws/streams";

interface ConnectWSProps {
	pair: string;
}

export default function ConnectWS({ pair }: ConnectWSProps) {
	const applyDelta = useOrderBookStore((state) => state.applyDelta);
	const addTrades = useTradeStore((state) => state.addTrades);
	const updateCandle = useCandleStore((state) => state.updateCandle);

	useEffect(() => {
		usePairStore.getState().addActiveTab(pair);

		const handleDepth = (msg: BinanceStreamMessage) => {
			applyDelta(msg as BinanceDepthUpdate);
		};
		const handleTrade = (msg: BinanceStreamMessage) => {
			addTrades([msg as BinanceTrade]);
		};
		const handleKline = (msg: BinanceStreamMessage) => {
			updateCandle(klineToCandle((msg as BinanceKlineEvent).k));
		};

		binanceWS.on("depthUpdate", handleDepth);
		binanceWS.on("trade", handleTrade);
		binanceWS.on("kline", handleKline);
		binanceWS.connect(
			getPairStreamUrl(pair),
			() => useWSStatusStore.getState().setPairConnected(true),
			() => useWSStatusStore.getState().setPairConnected(false),
		);

		return () => {
			binanceWS.off("depthUpdate");
			binanceWS.off("trade");
			binanceWS.off("kline");
			binanceWS.disconnect();
			useWSStatusStore.getState().setPairConnected(false);
		};
	}, [pair, applyDelta, addTrades, updateCandle]);

	return null;
}
