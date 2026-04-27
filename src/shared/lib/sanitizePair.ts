const VALID_PAIR = /^[A-Z0-9]{2,20}$/;

export function sanitizePair(raw: string): string | null {
	const candidate = raw.trim().toUpperCase();
	return VALID_PAIR.test(candidate) ? candidate : null;
}
