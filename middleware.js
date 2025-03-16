import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; // Pas besoin de "type" si JS

export function middleware(request) {
  // Utilisation correcte des cookies dans middleware
  const session = request.cookies.get('session')?.value; // Important → .value ici

  const protectedPaths = ['/dashboard', '/application'];

  const isProtected = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!session && isProtected) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/application/:path*'],
};
