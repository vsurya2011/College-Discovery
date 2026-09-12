export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { clearSession } from '@/lib/auth';
export async function POST(){await clearSession();return Response.json({ok:true});}
