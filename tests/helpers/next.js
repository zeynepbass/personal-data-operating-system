import { vi } from "vitest";

export const requestState = {
  cookies: new Map(),
  cookieOptions: new Map(),
  headers: new Headers({ "user-agent": "vitest", "x-forwarded-for": "203.0.113.10" }),
  afterTasks: [],
};

export function resetRequestState({ ip = "203.0.113.10" } = {}) {
  requestState.cookies.clear();
  requestState.cookieOptions.clear();
  requestState.headers = new Headers({ "user-agent": "vitest", "x-forwarded-for": ip });
  requestState.afterTasks = [];
}

export async function flushAfter() {
  await Promise.all(requestState.afterTasks.splice(0));
}

export class RedirectError extends Error {
  constructor(url) {
    super(`NEXT_REDIRECT ${url}`);
    this.url = url;
    this.digest = `NEXT_REDIRECT;replace;${url};307;`;
  }
}

/**
 * @param {Promise<unknown>} promise
 * @returns {Promise<string | null>}
 */
export async function catchRedirect(promise) {
  try {
    await promise;
    return null;
  } catch (error) {
    if (error instanceof RedirectError) return error.url;
    throw error;
  }
}

export const nextHeadersMock = () => ({
  cookies: async () => ({
    get: (name) =>
      requestState.cookies.has(name) ? { name, value: requestState.cookies.get(name) } : undefined,
    set: (name, value, options) => {
      requestState.cookies.set(name, value);
      requestState.cookieOptions.set(name, options);
    },
    delete: (name) => requestState.cookies.delete(name),
  }),
  headers: async () => requestState.headers,
});

export const nextNavigationMock = () => ({
  redirect: vi.fn((url) => {
    throw new RedirectError(url);
  }),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  unstable_rethrow: (error) => {
    if (error instanceof RedirectError) throw error;
  },
});

export const nextServerMock = () => ({
  after: (task) => {
    requestState.afterTasks.push(Promise.resolve().then(task));
  },
});

export const nextCacheMock = () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() });
