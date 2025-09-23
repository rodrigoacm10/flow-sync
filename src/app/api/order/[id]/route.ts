import { OrderService } from '@/services/orderService'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    console.log('IDDD', id)

    const resposne = await new OrderService().delete(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 400 },
    )
  }
}
