export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSession, verifyPassword } from '@/lib/auth';
import { jsonError } from '@/lib/api';
const schema=z.object({email:z.email(),password:z.string().min(8)});
export async function POST(req:Request){try{const data=schema.parse(await req.json());const user=await prisma.user.findUnique({where:{email:data.email.toLowerCase()}});if(!user||!(await verifyPassword(data.password,user.passwordHash)))return jsonError('Invalid email or password',401);await createSession({userId:user.id,email:user.email,name:user.name});return Response.json({user:{userId:user.id,email:user.email,name:user.name}});}catch(e){if(e instanceof z.ZodError)return jsonError(e.issues[0]?.message||'Invalid input');return jsonError('Login failed',500);}}
