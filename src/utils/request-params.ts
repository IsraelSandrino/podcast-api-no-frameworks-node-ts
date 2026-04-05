import { IncomingMessage } from "http";
import { AuthenticatedRequest } from "../types/authenticated-request";
import { RoutedRequest } from "../types/routed-request";
import { AppError } from "../shared/errors/app-error";
import { StatusCode } from "./status-code";

type RoutedIncomingMessage = IncomingMessage & RoutedRequest;
type AuthenticatedIncomingMessage = IncomingMessage & AuthenticatedRequest;

export const getRequiredRouteParam = (
  request: RoutedIncomingMessage,
  paramName: string,
): string => {
  const value = request.params?.[paramName];

  if (!value) {
    throw new AppError(
      `Missing required route param: ${paramName}`,
      StatusCode.BAD_REQUEST,
    );
  }

  return value;
};

export const getRequiredRouteNumberParam = (
  request: RoutedIncomingMessage,
  paramName: string,
): number => {
  const value = getRequiredRouteParam(request, paramName);
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new AppError(
      `Invalid numeric route param: ${paramName}`,
      StatusCode.BAD_REQUEST,
    );
  }

  return parsed;
};

export const getAuthenticatedUserId = (
  request: AuthenticatedIncomingMessage,
): number => {
  const userId = request.user?.id;

  if (!Number.isFinite(userId)) {
    throw new AppError("Authenticated user not found", StatusCode.UNAUTHORIZED);
  }

  return Number(userId);
};
