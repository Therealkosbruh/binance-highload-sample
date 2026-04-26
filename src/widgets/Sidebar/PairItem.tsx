"use client";
import Link from "next/link";
import { memo, useCallback, useRef } from "react";
import { formatPair } from "@/shared/lib/formatPair";
import styles from "./Sidebar.module.scss";

interface PairItemProps {
	pair: string;
	isActive: boolean;
	onActivate: (pair: string) => void;
}

const PairItem = memo(function PairItem({ pair, isActive, onActivate }: PairItemProps) {
	const ref = useRef<HTMLAnchorElement>(null);

	const handleTouchStart = useCallback(() => {
		if (styles.touched) ref.current?.classList.add(styles.touched);
	}, []);

	const handleTouchEnd = useCallback(() => {
		if (styles.touched) ref.current?.classList.remove(styles.touched);
	}, []);

	const handleClick = useCallback(() => {
		onActivate(pair);
	}, [pair, onActivate]);

	return (
		<Link
			ref={ref}
			href={`/dashboard/${pair}`}
			className={isActive ? styles.activeItem : styles.item}
			onClick={handleClick}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchCancel={handleTouchEnd}
		>
			<span className={styles.pairName}>{formatPair(pair)}</span>
		</Link>
	);
});

export default PairItem;
