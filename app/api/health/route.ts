export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { prisma } from '@/lib/prisma';
export async function GET(){try{await prisma.$queryRaw`SELECT 1`;return Response.json({ok:true,service:'college-discovery-api'});}catch{return Response.json({ok:false},{status:500});}}
