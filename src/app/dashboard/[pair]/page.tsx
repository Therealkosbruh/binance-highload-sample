import type { Metadata } from "next";
import ConnectTicker from "@/features/connect-ticker/ConnectTicker";
import ConnectWS from "@/features/connect-ws/ConnectWS";
import { buildFallbackMeta, buildPairMeta } from "@/shared/lib/buildMeta";
import { formatPair } from "@/shared/lib/formatPair";
import { sanitizePair } from "@/shared/lib/sanitizePair";
import CandlestickChart from "@/widgets/CandlestickChart/CandlestickChart";
import RightPanel from "@/widgets/RightPanel/RightPanel";
import Sidebar from "@/widgets/Sidebar/Sidebar";
import styles from "./page.module.scss";

interface DashboardPageProps {
	params: Promise<{ pair: string }>;
}

export async function generateMetadata({ params }: DashboardPageProps): Promise<Metadata> {
	const { pair } = await params;
	const safePair = sanitizePair(pair);
	if (!safePair) return buildFallbackMeta();
	return buildPairMeta(formatPair(safePair));
}

export default async function DashboardPage({ params }: DashboardPageProps) {
	const { pair } = await params;
	return (
		<div className={styles.layout}>
			<ConnectWS pair={pair} />
			<ConnectTicker />
			<Sidebar />
			<section className={styles.center}>
				<CandlestickChart pair={pair} />
			</section>
			<div className={styles.rightPanel}>
				<RightPanel pair={pair} />
			</div>
		</div>
	);
}
