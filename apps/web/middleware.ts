import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { COUNTRY_COOKIE, isCountrySlug } from "@/lib/country";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret-change-in-production"
);

const COUNTRY_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Public paths that existed before the per-country URLs were introduced
const LEGACY_PUBLIC_PREFIXES = [
  "/experiencias",
  "/hospedajes",
  "/ciudades",
  "/servicios",
  "/contacto",
  "/va",
  "/practicar",
  "/participar",
  "/presenciar",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Admin auth ---
  if (pathname === "/admin/login") {
    const token = request.cookies.get("auth-token")?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        // Invalid token, let them see login
      }
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // --- Country selection ---
  const savedCountry = request.cookies.get(COUNTRY_COOKIE)?.value;

  // Root: skip the selector if the user already chose a country
  if (pathname === "/") {
    if (savedCountry && isCountrySlug(savedCountry)) {
      return NextResponse.redirect(new URL(`/${savedCountry}`, request.url));
    }
    return NextResponse.next();
  }

  // Country-prefixed routes: remember the choice
  const firstSegment = pathname.split("/")[1];
  if (isCountrySlug(firstSegment)) {
    const response = NextResponse.next();
    if (savedCountry !== firstSegment) {
      response.cookies.set(COUNTRY_COOKIE, firstSegment, {
        maxAge: COUNTRY_COOKIE_MAX_AGE,
        path: "/",
      });
    }
    return response;
  }

  // Legacy URLs without country prefix: send to the saved country or the selector
  if (LEGACY_PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    if (savedCountry && isCountrySlug(savedCountry)) {
      const url = new URL(`/${savedCountry}${pathname}`, request.url);
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/",
    "/argentina/:path*",
    "/venezuela/:path*",
    "/experiencias/:path*",
    "/hospedajes/:path*",
    "/ciudades/:path*",
    "/servicios/:path*",
    "/contacto/:path*",
    "/va/:path*",
    "/practicar",
    "/participar",
    "/presenciar",
  ],
};
