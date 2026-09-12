export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { prisma } from '@/lib/prisma';
import { parseIntParam } from '@/lib/api';
export async function GET(req:Request){const u=new URL(req.url);const q=(u.searchParams.get('q')||'').trim();const city=(u.searchParams.get('city')||'').trim();const minRating=Number(u.searchParams.get('minRating')||'0');const minFees=Number(u.searchParams.get('minFees')||'0');const maxFees=Number(u.searchParams.get('maxFees')||'0');const page=Math.max(1,parseIntParam(u.searchParams.get('page'),1));const limit=Math.min(24,Math.max(1,parseIntParam(u.searchParams.get('limit'),9)));
 const where:any={AND:[q?{OR:[{name:{contains:q,mode:'insensitive'}},{city:{contains:q,mode:'insensitive'}},{state:{contains:q,mode:'insensitive'}},{courses:{some:{name:{contains:q,mode:'insensitive'}}}}]}:{},city?{OR:[{city:{contains:city,mode:'insensitive'}},{state:{contains:city,mode:'insensitive'}}]}:{},minRating?{rating:{gte:minRating}}:{},minFees?{fees:{gte:minFees}}:{},maxFees?{fees:{lte:maxFees}}:{}]};
 const [rows,total]=await Promise.all([prisma.college.findMany({where,orderBy:[{rating:'desc'},{name:'asc'}],skip:(page-1)*limit,take:limit,select:{id:true,name:true,slug:true,city:true,state:true,fees:true,rating:true,placementPct:true,avgPackage:true,imageUrl:true,exams:true}}),prisma.college.count({where})]);
 return Response.json({data:rows,pagination:{page,limit,total,pages:Math.ceil(total/limit)}});
}
