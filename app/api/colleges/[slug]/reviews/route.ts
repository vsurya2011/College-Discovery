export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { jsonError } from '@/lib/api';
const schema=z.object({title:z.string().trim().min(3).max(100),body:z.string().trim().min(10).max(1200),rating:z.number().int().min(1).max(5)});
export async function POST(req:Request,ctx:{params:Promise<{slug:string}>}){try{const user=await requireUser();const {slug}=await ctx.params;const college=await prisma.college.findUnique({where:{slug},select:{id:true}});if(!college)return jsonError('College not found',404);const d=schema.parse(await req.json());const review=await prisma.review.create({data:{...d,userId:user.id,collegeId:college.id},include:{user:{select:{name:true}}}});return Response.json({review},{status:201});}catch(e){if(e instanceof Error&&e.message==='UNAUTHORIZED')return jsonError('Login required',401);if(e instanceof z.ZodError)return jsonError(e.issues[0]?.message||'Invalid review');return jsonError('Could not create review',500);}}
