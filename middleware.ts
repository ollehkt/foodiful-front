import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh')?.value
  if (!refreshToken) return NextResponse.redirect(new URL('/auth', request.url))
  else return NextResponse.next()
}

export const config = {
  matcher: ['/mypage/:path*', '/reservation/:path*'],
}
