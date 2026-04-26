import ConnectTicker from "@/features/connect-ticker/ConnectTicker";
import ConnectWS from "@/features/connect-ws/ConnectWS";
import CandlestickChart from "@/widgets/CandlestickChart/CandlestickChart";
import RightPanel from "@/widgets/RightPanel/RightPanel";
import Sidebar from "@/widgets/Sidebar/Sidebar";
import styles from "./page.module.scss";

interface DashboardPageProps {
	params: Promise<{ pair: string }>;
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
