import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, fileUrl } = await req.json();

    if (!email || !fileUrl) {
      return NextResponse.json({ message: 'Email and file URL are required.' }, { status: 400 });
    }

    const policyHolder = await prisma.policyHolder.findUnique({ where: { email } });

    if (!policyHolder) {
      return NextResponse.json({ message: 'Policy holder not found.' }, { status: 404 });
    }

    const fileName = fileUrl.split('/').pop() ?? 'claim_file';

    const newClaim = await prisma.claimFile.create({
      data: {
        file_name: fileName,
        file_path: fileUrl,
        policy_holder_id: policyHolder.id,
        status: 'Pending',
      },
    });

    return NextResponse.json({ message: 'Claim submitted successfully!', claim: newClaim });
  } catch (err) {
    console.error('Error submitting claim:', err);
    return NextResponse.json({ message: 'Failed to submit claim.' }, { status: 500 });
  }
}
