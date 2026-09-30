import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { buildCsp, proxy } from "./proxy";

const request = (path, cookie) =>
  new NextRequest(`http://localhost:3000${path}`, {
    headers: cookie ? { cookie } : {},
  });

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("proxy", () => {
  it("redirects anonymous visitors to login and remembers the target", () => {
    const response = proxy(request("/notes?tab=1"));

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get("location"));
    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("next")).toBe("/notes?tab=1");
  });

  it.each(["/login", "/register", "/forgot-password", "/reset-password/abc"])(
    "lets anonymous visitors reach %s",
    (path) => {
      const response = proxy(request(path));
      expect(response.headers.get("location")).toBeNull();
    },
  );

  it("does not treat look-alike paths as public", () => {
    expect(proxy(request("/login-admin")).status).toBe(307);
  });

  it("passes requests with a session cookie through and sets a nonce-based CSP", () => {
    const response = proxy(request("/dashboard", "pdos_session=abc"));
    const csp = response.headers.get("content-security-policy");

    expect(response.headers.get("location")).toBeNull();
    expect(csp).toMatch(/script-src 'self' 'nonce-[A-Za-z0-9+/=]+' 'strict-dynamic'/);
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
  });

  it("issues a fresh nonce per request", () => {
    const first = proxy(request("/login")).headers.get("content-security-policy");
    const second = proxy(request("/login")).headers.get("content-security-policy");
    expect(first).not.toBe(second);
  });

  it("only allows eval and upgrades requests in the right environments", () => {
    expect(buildCsp("n", { isDev: true, https: false })).toContain("'unsafe-eval'");
    expect(buildCsp("n", { isDev: false, https: false })).not.toContain("'unsafe-eval'");
    expect(buildCsp("n", { isDev: false, https: true })).toContain("upgrade-insecure-requests");
  });

  it("adds HSTS only behind https", () => {
    vi.stubEnv("APP_URL", "https://pdos.example");
    expect(proxy(request("/login")).headers.get("strict-transport-security")).toMatch(/max-age=/);

    vi.stubEnv("APP_URL", "http://localhost:3000");
    expect(proxy(request("/login")).headers.get("strict-transport-security")).toBeNull();
  });
});
