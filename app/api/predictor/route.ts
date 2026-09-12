export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { prisma } from '@/lib/prisma';
const examBase:Record<string,number>={"JEE Main":250000,"JEE Advanced":15000,BITSAT:350000,VITEEE:150000,SRMJEEE:200000,AEEE:100000,MET:80000,TNEA:250000};
export async function GET(req:Request){const u=new URL(req.url);const exam=u.searchParams.get('exam')||'JEE Main';const rank=Math.max(1,Number(u.searchParams.get('rank')||0));if(!Number.isFinite(rank)||!examBase[exam])return Response.json({error:'Unsupported exam or rank'},{status:400});const colleges=await prisma.college.findMany({where:{exams:{has:exam}},select:{id:true,name:true,slug:true,city:true,state:true,fees:true,rating:true,placementPct:true,exams:true}});
 const base=examBase[exam];const results=colleges.map(c=>{const estimatedCutoff=Math.max(100,Math.round(base*Math.pow((c.rating-3.5)/1.5,1.65)));const rankScore=Math.max(0,Math.min(1,1-rank/(estimatedCutoff*1.15)));const quality=((c.rating/5)*0.45)+(c.placementPct/100*0.35)+(rankScore*0.20);return {...c,match:Math.round(quality*100),estimatedCutoff};}).filter(c=>rank<=c.estimatedCutoff*1.25).sort((a,b)=>b.match-a.match).slice(0,8);
 return Response.json({recommendations:results,meta:{exam,rank,message:results.length?`Found ${results.length} matching colleges from the database.`:'No strong matches found. Try a broader rank or another exam.'}});}
