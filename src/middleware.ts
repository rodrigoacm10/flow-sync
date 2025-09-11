import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJwt } from '@/lib/jwt'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  console.log('TOKEN', token)

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const decoded = verifyJwt(token)
  console.log('DECODED', decoded)
  if (!decoded) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'], // protege dashboard
}
