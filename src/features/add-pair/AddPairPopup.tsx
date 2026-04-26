"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePairStore } from "@/entities/pair/model";
import type { SymbolEntry } from "@/entities/pair/searchApi";
import { loadSearchableSymbols } from "@/entities/pair/searchApi";
import { useDebounce } from "@/shared/hooks/useDebounce";
import styles from "./AddPairPopup.module.scss";
import SearchSection from "./SearchSection";

interface AddPairPopupProps {
	onClose: () => void;
}

export default function AddPairPopup({ onClose }: AddPairPopupProps) {
	const [mounted, setMounted] = useState(false);
	const baseInputRef = useRef<HTMLInputElement>(null);
	const [symbols, setSymbols] = useState<SymbolEntry[]>([]);
	const [baseQuery, setBaseQuery] = useState("");
	const [quoteQuery, setQuoteQuery] = useState("");
	const [selectedBase, setSelectedBase] = useState("");
	const [selectedQuote, setSelectedQuote] = useState("");

	const addToWatchlist = usePairStore((s) => s.addToWatchlist);
	const addActiveTab = usePairStore((s) => s.addActiveTab);
	const router = useRouter();

	const debouncedBase = useDebounce(baseQuery, 250);
	const debouncedQuote = useDebounce(quoteQuery, 250);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted) baseInputRef.current?.focus();
	}, [mounted]);

	useEffect(() => {
		loadSearchableSymbols()
			.then(setSymbols)
			.catch(() => {});
	}, []);

	const baseResults = useMemo(() => {
		if (!debouncedBase) return [];
		const q = debouncedBase.toUpperCase();
		const seen = new Set<string>();
		const out: string[] = [];
		for (const s of symbols) {
			if (s.base.startsWith(q) && !seen.has(s.base)) {
				seen.add(s.base);
				out.push(s.base);
				if (out.length === 8) break;
			}
		}
		return out;
	}, [symbols, debouncedBase]);

	const quoteResults = useMemo(() => {
		if (!debouncedQuote) return [];
		const q = debouncedQuote.toUpperCase();
		const seen = new Set<string>();
		const out: string[] = [];
		const src = selectedBase ? symbols.filter((s) => s.base === selectedBase) : symbols;
		for (const s of src) {
			if (s.quote.startsWith(q) && !seen.has(s.quote)) {
				seen.add(s.quote);
				out.push(s.quote);
				if (out.length === 8) break;
			}
		}
		return out;
	}, [symbols, debouncedQuote, selectedBase]);

	const pairExists = useMemo(
		() =>
			!!selectedBase &&
			!!selectedQuote &&
			symbols.some((s) => s.base === selectedBase && s.quote === selectedQuote),
		[symbols, selectedBase, selectedQuote],
	);

	const handleBaseQueryChange = useCallback((value: string) => {
		setBaseQuery(value);
		setSelectedBase("");
	}, []);

	const handleBaseSelect = useCallback((value: string) => {
		setSelectedBase(value);
		setBaseQuery(value);
	}, []);

	const handleQuoteQueryChange = useCallback((value: string) => {
		setQuoteQuery(value);
		setSelectedQuote("");
	}, []);

	const handleQuoteSelect = useCallback((value: string) => {
		setSelectedQuote(value);
		setQuoteQuery(value);
	}, []);

	const handleAdd = useCallback(() => {
		if (!pairExists) return;
		const pair = `${selectedBase}${selectedQuote}`;
		addToWatchlist(pair);
		addActiveTab(pair);
		router.push(`/dashboard/${pair}`);
		onClose();
	}, [pairExists, selectedBase, selectedQuote, addToWatchlist, addActiveTab, router, onClose]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			else if (e.key === "Enter" && pairExists) handleAdd();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose, pairExists, handleAdd]);

	if (!mounted) return null;

	const popup = (
		<>
			<button
				type="button"
				className={styles.backdrop}
				onClick={onClose}
				aria-label="Close dialog"
			/>
			<div className={styles.popup} role="dialog" aria-modal aria-label="Add pair">
				<button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
					×
				</button>

				<div className={styles.body}>
					<span className={styles.title}>Add pair</span>

					<SearchSection
						label="Base"
						placeholder="BTC"
						query={baseQuery}
						results={baseResults}
						selected={selectedBase}
						onQueryChange={handleBaseQueryChange}
						onSelect={handleBaseSelect}
						inputRef={baseInputRef}
					/>

					<div className={styles.divider} />

					<SearchSection
						label="Quote"
						placeholder="USDT"
						query={quoteQuery}
						results={quoteResults}
						selected={selectedQuote}
						onQueryChange={handleQuoteQueryChange}
						onSelect={handleQuoteSelect}
					/>
				</div>

				{pairExists && (
					<div className={styles.preview}>
						{selectedBase}/{selectedQuote}
					</div>
				)}

				<div className={styles.footer}>
					<button
						type="button"
						className={styles.addBtn}
						disabled={!pairExists}
						onClick={handleAdd}
					>
						Add pair
					</button>
				</div>
			</div>
		</>
	);

	return createPortal(popup, document.body);
}
