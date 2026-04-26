import SearchIcon from "@/shared/ui/icons/SearchIcon";
import styles from "./NoPairFallback.module.scss";

export default function NoPairFallback() {
	return (
		<div className={styles.container}>
			<div className={styles.iconWrap}>
				<SearchIcon />
			</div>
			<p className={styles.title}>Select a trading pair</p>
			<p className={styles.subtitle}>
				Choose from the sidebar or add your own pair to the watchlist
			</p>
		</div>
	);
}
