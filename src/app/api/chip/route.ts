import { getUserIdFromRequest } from '@/lib/auth'
import { ChipService } from '@/services/chipService'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)

    const { ...body } = await req.json()

    const response = await new ChipService().create({
      ...body,
      userId,
      saved: true, // obrigatório ser true
      synced: false, // default off
    })

    return NextResponse.json({ data: response }, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 400 },
    )
  }
}
