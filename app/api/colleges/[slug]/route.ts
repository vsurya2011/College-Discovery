export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { prisma } from '@/lib/prisma';
export async function GET(_:Request, ctx:{params:Promise<{slug:string}>}){const {slug}=await ctx.params;const college=await prisma.college.findUnique({where:{slug},include:{courses:{orderBy:{name:'asc'}},reviews:{orderBy:{createdAt:'desc'},take:20,include:{user:{select:{name:true}}}}}});if(!college)return Response.json({error:'College not found'},{status:404});return Response.json({college});}
