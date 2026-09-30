import "server-only";

import { getCurrentUser } from "./auth/dal";
import { AppError, isAppError } from "./errors";
import { logger } from "./logger";

/**
 * @typedef {{ request: Request, params: Record<string, string>, user: any, searchParams: URLSearchParams }} RouteContext
 */

/**
 * @param {(context: RouteContext) => Promise<Response | unknown>} handler
 * @returns {(request: Request, context: { params?: Promise<Record<string, string>> }) => Promise<Response>}
 */
export function authedRoute(handler) {
  return async (request, context = {}) => {
    try {
      const user = await getCurrentUser();
      if (!user) return Response.json({ error: "Yetkilendirme gerekli." }, { status: 401 });

      const params = (await context.params) ?? {};
      const searchParams = new URL(request.url).searchParams;
      const result = await handler({ request, params, user, searchParams });

      return result instanceof Response ? result : Response.json(result);
    } catch (error) {
      if (isAppError(error)) {
        return Response.json(
          { error: error.message, code: error.code, fieldErrors: error.fieldErrors },
          { status: error.status },
        );
      }
      logger.error({ err: error, url: request.url }, "route handler failed");
      return Response.json({ error: "Beklenmeyen bir hata oluştu." }, { status: 500 });
    }
  };
}

/**
 * @param {Request} request
 */
export function assertSameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return;

  if (new URL(origin).host !== host) {
    throw new AppError("FORBIDDEN", "İstek kaynağı doğrulanamadı.");
  }
}
