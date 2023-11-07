import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request) {

	if (!request.cookies.has('token')) {
		return NextResponse.json(
			{ message: 'Unauthorized - Access token is missing' },
			{ status: 401 }
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/api/:path*',
}