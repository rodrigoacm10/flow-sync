import { GroupService } from '@/services/groupService'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const response = new GroupService().delete(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: err?.message || 'Internal Server error' },
      { status: 500 },
    )
  }
}
