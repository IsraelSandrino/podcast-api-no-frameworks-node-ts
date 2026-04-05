import { IncomingMessage, ServerResponse } from "http";
import { authMiddleware } from "../modules/auth/auth.middleware";
import { RoutedRequest } from "../types/routed-request";
import { withErrorHandler } from "../shared/http/with-error-handler";
import { matchRoute } from "./route-matcher";

export const registerRoutes = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const matchedRoute = matchRoute(request.method, request.url);

  if (!matchedRoute) {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Route not found" }));
    return;
  }

  (request as RoutedRequest).params = matchedRoute.params;

  const safeHandler = withErrorHandler(async (currentRequest, currentResponse) => {
    await matchedRoute.handler(currentRequest, currentResponse);
  });

  if (matchedRoute.requiresAuth) {
    authMiddleware(request, response, () => {
      void safeHandler(request, response);
    });
    return;
  }

  await safeHandler(request, response);
};
