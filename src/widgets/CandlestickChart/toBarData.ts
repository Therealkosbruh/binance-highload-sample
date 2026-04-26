import type { UTCTimestamp } from "lightweight-charts";
import type { CandleData } from "@/shared/types/types";

export function toBarData(c: CandleData) {
	return {
		time: c.time as UTCTimestamp,
		open: c.open,
		high: c.high,
		low: c.low,
		close: c.close,
	};
}
