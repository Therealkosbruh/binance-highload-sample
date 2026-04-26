import Statusbar from "@/widgets/Statusbar/Statusbar";
import Topbar from "@/widgets/Topbar/Topbar";
import styles from "./layout.module.scss";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={styles.app}>
			<Topbar />
			<div className={styles.main}>{children}</div>
			<Statusbar />
		</div>
	);
}
