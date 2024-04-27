import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const currentUser = request.cookies.get('token')?.value;
	const BASE_PATH = process.env.BASE_PATH ?? '';
	if (request.nextUrl.pathname.startsWith(BASE_PATH + '/dashboard') && !currentUser) {
		return NextResponse.redirect(new URL(BASE_PATH + '/login', request.url));
	}

	if (request.nextUrl.pathname.startsWith(BASE_PATH + '/login') && currentUser) {
		return NextResponse.redirect(new URL(BASE_PATH + '/dashboard', request.url));
	}

	return NextResponse.next();
}
