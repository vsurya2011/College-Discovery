export function jsonError(message: string, status = 400) { return Response.json({ error: message }, { status }); }
export function parseIntParam(value: string | null, fallback: number) { const n = Number(value); return Number.isFinite(n) ? Math.trunc(n) : fallback; }
