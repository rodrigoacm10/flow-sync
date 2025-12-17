import { CategoryService } from '@/services/categoryService'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const response = await new CategoryService().delete(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({
      message: err.message || 'Internal Server Error',
    })
  }
}
