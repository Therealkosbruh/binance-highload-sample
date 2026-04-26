"use client";
import Link from "next/link";
import { memo, useCallback, useRef } from "react";
import { formatPair } from "@/shared/lib/formatPair";
import TrashIcon from "@/shared/ui/icons/TrashIcon";
import styles from "./Sidebar.module.scss";

interface WatchlistItemProps {
	pair: string;
	isActive: boolean;
	onActivate: (pair: string) => void;
	onRemove: (pair: string) => void;
}

const WatchlistItem = memo(function WatchlistItem({
	pair,
	isActive,
	onActivate,
	onRemove,
}: WatchlistItemProps) {
	const ref = useRef<HTMLDivElement>(null);

	const handleTouchStart = useCallback(() => {
		if (styles.touched) ref.current?.classList.add(styles.touched);
	}, []);

	const handleTouchEnd = useCallback(() => {
		if (styles.touched) ref.current?.classList.remove(styles.touched);
	}, []);

	const handleActivate = useCallback(() => {
		onActivate(pair);
	}, [pair, onActivate]);

	const handleRemove = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			onRemove(pair);
		},
		[pair, onRemove],
	);

	return (
		<div
			ref={ref}
			className={isActive ? styles.activeItemWrap : styles.itemWrap}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchCancel={handleTouchEnd}
		>
			<Link href={`/dashboard/${pair}`} className={styles.itemLink} onClick={handleActivate}>
				<span className={styles.pairName}>{formatPair(pair)}</span>
			</Link>
			<button
				type="button"
				className={styles.deleteBtn}
				onClick={handleRemove}
				aria-label={`Remove ${pair}`}
			>
				<TrashIcon />
			</button>
		</div>
	);
});

export default WatchlistItem;
