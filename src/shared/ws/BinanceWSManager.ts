import type { BinanceStreamMessage, StreamHandler } from "@/shared/types/types";

export class BinanceWSManager {
	private socket: WebSocket | null = null;
	private handlers = new Map<string, StreamHandler>();
	private buffer: BinanceStreamMessage[] = [];
	private rafId: number | null = null;

	connect(url: string, onOpen?: () => void, onClose?: () => void): void {
		this.disconnect();
		this.socket = new WebSocket(url);
		this.socket.onmessage = (e) => this.enqueue(JSON.parse(e.data as string));
		this.socket.onopen = () => {
			this.startFlush();
			onOpen?.();
		};
		this.socket.onclose = () => onClose?.();
	}

	disconnect(): void {
		if (this.rafId !== null) {
			cancelAnimationFrame(this.rafId);
			this.rafId = null;
		}
		this.socket?.close();
		this.socket = null;
		this.buffer = [];
	}

	on(eventType: string, handler: StreamHandler): void {
		this.handlers.set(eventType, handler);
	}

	off(eventType: string): void {
		this.handlers.delete(eventType);
	}

	private enqueue(raw: unknown): void {
		if (Array.isArray(raw)) {
			for (const item of raw) this.buffer.push(item as BinanceStreamMessage);
			return;
		}
		const msg = raw as Record<string, unknown>;
		const data = "stream" in msg ? msg.data : raw;
		this.buffer.push(data as BinanceStreamMessage);
	}

	private startFlush(): void {
		const flush = () => {
			if (this.buffer.length > 0) {
				const batch = this.buffer.splice(0);
				for (const msg of batch) {
					const handler = this.handlers.get(msg.e);
					if (handler) handler(msg);
				}
			}
			this.rafId = requestAnimationFrame(flush);
		};
		this.rafId = requestAnimationFrame(flush);
	}
}

export const binanceWS = new BinanceWSManager();
export const tickerWS = new BinanceWSManager();
