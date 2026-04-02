import { IncomingMessage, ServerResponse } from "node:http";
import { StatusCode } from "../utils/status-code";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "";
const defaulContent = { "Content-Type": "application/json" };

export const authMiddleware = (
  request: IncomingMessage,
  response: ServerResponse,
  next: () => void,
) => {
  const authHeader = request.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response.writeHead(StatusCode.UNAUTHORIZED, defaulContent);
    response.end(JSON.stringify({ message: "Token not provided" }));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    (request as any).user = decoded;
    next();
  } catch (error) {
    response.writeHead(StatusCode.UNAUTHORIZED, defaulContent);
    response.end(JSON.stringify({ message: "Invalid token" }));
  }
};
