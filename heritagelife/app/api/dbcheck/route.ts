import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany(); // adjust to any existing table
    return NextResponse.json({ ok: true, count: users.length });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
