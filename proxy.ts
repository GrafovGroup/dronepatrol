import { NextRequest, NextResponse } from 'next/server';
export function proxy(request:NextRequest){const headers=new Headers(request.headers);headers.set('x-site-locale',request.nextUrl.pathname==='/fr'||request.nextUrl.pathname.startsWith('/fr/')?'fr':'en');return NextResponse.next({request:{headers}})}
export const config={matcher:['/((?!_next|images|favicon|apple-touch-icon|robots.txt|sitemap.xml).*)']};
