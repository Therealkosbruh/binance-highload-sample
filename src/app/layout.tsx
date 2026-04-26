import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.scss";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

const mono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: ["400", "500"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "FLUX — Real-time Trading Dashboard",
	description:
		"Real-time Binance market data: candlestick charts, order book depth, live trade feed, and multi-pair watchlist.",
	metadataBase: new URL("https://flux-trading.vercel.app"),
	openGraph: {
		type: "website",
		url: "/",
		title: "FLUX — Real-time Trading Dashboard",
		description:
			"Real-time Binance market data: candlestick charts, order book depth, live trade feed, and multi-pair watchlist.",
		siteName: "FLUX",
	},
	twitter: {
		card: "summary_large_image",
		title: "FLUX — Real-time Trading Dashboard",
		description:
			"Real-time Binance market data: candlestick charts, order book depth, live trade feed, and multi-pair watchlist.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} ${mono.variable}`}>
			<body>{children}</body>
		</html>
	);
}
