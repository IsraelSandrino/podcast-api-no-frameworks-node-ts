import { IncomingMessage, ServerResponse } from "http";
import { AppError } from "../errors/app-error";
import { StatusCode } from "../../utils/status-code";
import { sendJson } from "./send-json";

// Converte erros tecnicos e de dominio em respostas HTTP controladas e consistentes.
export const withErrorHandler = (
  handler: (
    request: IncomingMessage,
    response: ServerResponse,
  ) => Promise<void> | void,
) => {
  return async (request: IncomingMessage, response: ServerResponse) => {
    try {
      await Promise.resolve(handler(request, response));
    } catch (error) {
      if (error instanceof AppError) {
        sendJson(response, error.statusCode, { message: error.message });
        return;
      }

      if (error instanceof Error && error.message === "INVALID_JSON") {
        sendJson(response, StatusCode.BAD_REQUEST, {
          message: "Invalid JSON payload",
        });
        return;
      }

      sendJson(response, StatusCode.INTERNAL_SERVER_ERROR, {
        message: "Internal server error",
      });
    }
  };
};
