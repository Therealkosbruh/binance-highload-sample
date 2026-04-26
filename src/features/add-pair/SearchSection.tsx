import type { RefObject } from "react";
import { memo } from "react";
import styles from "./AddPairPopup.module.scss";

interface SearchSectionProps {
	label: string;
	placeholder: string;
	query: string;
	results: string[];
	selected: string;
	onQueryChange: (value: string) => void;
	onSelect: (value: string) => void;
	inputRef?: RefObject<HTMLInputElement | null>;
}

const SearchSection = memo(function SearchSection({
	label,
	placeholder,
	query,
	results,
	selected,
	onQueryChange,
	onSelect,
	inputRef,
}: SearchSectionProps) {
	return (
		<div className={styles.section}>
			<span className={styles.colLabel}>{label}</span>
			<input
				ref={inputRef}
				className={styles.input}
				placeholder={placeholder}
				value={query}
				onChange={(e) => onQueryChange(e.target.value)}
			/>
			<div className={styles.suggestions}>
				{results.map((item) => (
					<button
						key={item}
						type="button"
						className={item === selected ? styles.activeSuggestion : styles.suggestion}
						onClick={() => onSelect(item)}
					>
						{item}
					</button>
				))}
			</div>
		</div>
	);
});

export default SearchSection;
