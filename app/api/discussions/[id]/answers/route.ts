export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { z } from 'zod';import { prisma } from '@/lib/prisma';import { requireUser } from '@/lib/auth';import { jsonError } from '@/lib/api';
const schema=z.object({body:z.string().trim().min(5).max(2000)});
export async function POST(req:Request,ctx:{params:Promise<{id:string}>}){try{const user=await requireUser();const {id}=await ctx.params;const exists=await prisma.discussion.findUnique({where:{id},select:{id:true}});if(!exists)return jsonError('Discussion not found',404);const {body}=schema.parse(await req.json());const answer=await prisma.answer.create({data:{body,userId:user.id,discussionId:id},include:{user:{select:{name:true}}}});return Response.json({answer},{status:201});}catch(e){if(e instanceof Error&&e.message==='UNAUTHORIZED')return jsonError('Login required',401);if(e instanceof z.ZodError)return jsonError(e.issues[0]?.message||'Invalid answer');return jsonError('Could not post answer',500);}}
