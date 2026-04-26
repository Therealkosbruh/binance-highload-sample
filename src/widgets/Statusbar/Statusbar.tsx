import Link from "next/link";
import styles from "./Statusbar.module.scss";

export default function Statusbar() {
	return (
		<footer className={styles.statusbar}>
			<span className={styles.copy}>
				Build by{" "}
				<Link
					href="https://github.com/Therealkosbruh"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.link}
				>
					Therealkos
				</Link>
			</span>
		</footer>
	);
}
