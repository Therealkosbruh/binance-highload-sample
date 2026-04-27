import { useEffect } from "react";
import { getBinanceDepth } from "@/entities/order-book/api";
import { useOrderBookStore } from "@/entities/order-book/model";

export default function useOrderBook(symbol: string) {
	const setSnapshot = useOrderBookStore((state) => state.setSnapshot);
	const reset = useOrderBookStore((state) => state.reset);

	useEffect(() => {
		reset();
		const controller = new AbortController();
		(async () => {
			try {
				const data = await getBinanceDepth(symbol, controller.signal);
				setSnapshot(data);
			} catch {
				//
			}
		})();
		return () => controller.abort();
	}, [symbol, setSnapshot, reset]);
}
