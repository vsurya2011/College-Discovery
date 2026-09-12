export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { prisma } from '@/lib/prisma';
export async function GET(req:Request){const ids=[...new Set((new URL(req.url).searchParams.get('ids')||'').split(',').map(s=>s.trim()).filter(Boolean))].slice(0,3);if(ids.length<2)return Response.json({error:'Provide 2 to 3 college ids'},{status:400});const colleges=await prisma.college.findMany({where:{id:{in:ids}},select:{id:true,name:true,slug:true,city:true,state:true,fees:true,rating:true,placementPct:true,avgPackage:true,highestPackage:true,exams:true}});return Response.json({data:ids.map(id=>colleges.find(c=>c.id===id)).filter(Boolean)});}
