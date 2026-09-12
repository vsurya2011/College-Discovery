export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSession, hashPassword } from '@/lib/auth';
import { jsonError } from '@/lib/api';
const schema=z.object({name:z.string().trim().min(2).max(60),email:z.email(),password:z.string().min(8).max(72)});
export async function POST(req:Request){try{const data=schema.parse(await req.json());const email=data.email.toLowerCase();const exists=await prisma.user.findUnique({where:{email}});if(exists)return jsonError('An account with this email already exists',409);const user=await prisma.user.create({data:{name:data.name,email,passwordHash:await hashPassword(data.password)}});await createSession({userId:user.id,email:user.email,name:user.name});return Response.json({user:{userId:user.id,email:user.email,name:user.name}},{status:201});}catch(e){if(e instanceof z.ZodError)return jsonError(e.issues[0]?.message||'Invalid input');return jsonError('Signup failed',500);}}
