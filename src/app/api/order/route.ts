import { NextRequest, NextResponse } from 'next/server'
import { OrderService } from '@/services/orderService'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)

    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date') ?? undefined

    const orders = await new OrderService().list({
      userId,
      date,
    })

    return NextResponse.json(orders)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 401 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)

    const body = await req.json()

    const newOrder = await new OrderService().create({
      ...body,
      userId,
      saved: true, // obrigatório ser true
      synced: false, // default off
    })

    return NextResponse.json(newOrder)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 400 },
    )
  }
}
