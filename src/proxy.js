import { NextResponse } from "next/server";

import { SESSION_COOKIE } from "@/server/auth/cookie-name";

const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

/** @param {string} pathname */
function isPublic(pathname) {
  return PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

const isHttps = () => (process.env.APP_URL ?? "").startsWith("https://");

/**
 * @param {string} nonce
 * @param {{ isDev?: boolean, https?: boolean }} [options]
 */
export function buildCsp(
  nonce,
  { isDev = process.env.NODE_ENV !== "production", https = isHttps() } = {},
) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self' data:",
    `connect-src 'self'${isDev ? " ws:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(https ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}

/** @param {import("next/server").NextRequest} request */
export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  if (!isPublic(pathname) && !request.cookies.has(SESSION_COOKIE)) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  if (isHttps()) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|uploads|_next/static|_next/image|assets|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
