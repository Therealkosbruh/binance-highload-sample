"use client";
import type { IChartApi, ISeriesApi } from "lightweight-charts";
import { CandlestickSeries, createChart } from "lightweight-charts";
import { useCallback, useEffect, useRef } from "react";
import { useCandleStore } from "@/entities/candle/model";
import useCandlestick from "@/entities/candle/useCandlestick";
import { usePairStore } from "@/entities/pair/model";
import type { ChartInterval } from "@/shared/types/types";
import styles from "./CandlestickChart.module.scss";
import { CANDLESTICK_SERIES_OPTIONS, CHART_OPTIONS } from "./chartConfig";
import { toBarData } from "./toBarData";

const INTERVALS: ChartInterval[] = ["1m", "5m", "15m", "1h", "4h", "1d"];

interface CandlestickChartProps {
	pair: string;
}

export default function CandlestickChart({ pair }: CandlestickChartProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

	const interval = usePairStore((state) => state.chartInterval);
	const setChartInterval = usePairStore((state) => state.setChartInterval);
	const candles = useCandleStore((state) => state.candles);
	const version = useCandleStore((state) => state.version);

	useCandlestick(pair, interval);

	useEffect(() => {
		if (!containerRef.current) return;

		const chart = createChart(containerRef.current, CHART_OPTIONS);
		const series = chart.addSeries(CandlestickSeries, CANDLESTICK_SERIES_OPTIONS);

		chartRef.current = chart;
		seriesRef.current = series as ISeriesApi<"Candlestick">;

		return () => {
			chart.remove();
			chartRef.current = null;
			seriesRef.current = null;
		};
	}, []);

	const prevVersionRef = useRef(0);

	useEffect(() => {
		if (!seriesRef.current) return;
		if (candles.length === 0) {
			prevVersionRef.current = version;
			return;
		}
		if (version !== prevVersionRef.current) {
			prevVersionRef.current = version;
			seriesRef.current.setData(candles.map(toBarData));
			chartRef.current?.timeScale().fitContent();
			return;
		}
		const last = candles[candles.length - 1];
		if (last) seriesRef.current.update(toBarData(last));
	}, [candles, version]);

	const handleInterval = useCallback(
		(iv: ChartInterval) => () => setChartInterval(iv),
		[setChartInterval],
	);

	return (
		<div className={styles.container}>
			<div className={styles.toolbar}>
				{INTERVALS.map((iv) => (
					<button
						key={iv}
						type="button"
						className={iv === interval ? styles.activeBtn : styles.btn}
						onClick={handleInterval(iv)}
					>
						{iv}
					</button>
				))}
			</div>
			<div ref={containerRef} className={styles.chart} />
		</div>
	);
}
