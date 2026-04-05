import { IncomingMessage, ServerResponse } from "node:http";
import jwt from "jsonwebtoken";
import {
  AuthenticatedRequest,
  AuthUser,
} from "../../types/authenticated-request";
import { StatusCode } from "../../utils/status-code";

const secret = process.env.SECRET;
const defaultContent = { "Content-Type": "application/json" };

export const authMiddleware = (
  request: IncomingMessage,
  response: ServerResponse,
  next: () => void,
) => {
  if (!secret) {
    response.writeHead(StatusCode.INTERNAL_SERVER_ERROR, defaultContent);
    response.end(JSON.stringify({ message: "JWT secret not configured" }));
    return;
  }

  const authHeader = request.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response.writeHead(StatusCode.UNAUTHORIZED, defaultContent);
    response.end(JSON.stringify({ message: "Token not provided" }));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // A tipagem explícita evita casts com any e documenta a injeção do usuário autenticado no request para os controllers protegidos.
    const decoded = jwt.verify(token, secret) as AuthUser;
    (request as AuthenticatedRequest).user = decoded;
    next();
  } catch {
    response.writeHead(StatusCode.UNAUTHORIZED, defaultContent);
    response.end(JSON.stringify({ message: "Invalid token" }));
  }
};
