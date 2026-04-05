import { RouteDefinition, routes } from "./route-definition";

export interface MatchedRoute {
  handler: RouteDefinition["handler"];
  requiresAuth: boolean;
  params: Record<string, string>;
}

const isDynamicRoute = (path: string) => path.endsWith("/");

const buildDynamicParams = (
  requestPath: string,
  route: RouteDefinition,
): Record<string, string> | null => {
  if (!requestPath.startsWith(route.path)) {
    return null;
  }

  const dynamicSegment = requestPath.slice(route.path.length);

  if (!dynamicSegment) {
    return null;
  }

  if (!route.paramName) {
    return {};
  }

  return {
    [route.paramName]: decodeURIComponent(dynamicSegment),
  };
};

export const matchRoute = (
  method: string | undefined,
  url: string | undefined,
): MatchedRoute | undefined => {
  const requestPath = url?.split("?")[0] ?? "";

  for (const route of routes) {
    if (route.method !== method) {
      continue;
    }

    if (!isDynamicRoute(route.path) && route.path === requestPath) {
      return {
        handler: route.handler,
        requiresAuth: route.requiresAuth ?? false,
        params: {},
      };
    }

    if (isDynamicRoute(route.path)) {
      const params = buildDynamicParams(requestPath, route);

      if (params) {
        return {
          handler: route.handler,
          requiresAuth: route.requiresAuth ?? false,
          params,
        };
      }
    }
  }

  return undefined;
};
