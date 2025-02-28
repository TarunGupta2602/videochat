import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request) {
  // Handle WebSocket upgrade
  if (request.headers.get('upgrade') === 'websocket') {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}