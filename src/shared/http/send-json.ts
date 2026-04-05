import { ServerResponse } from "http";

const jsonContentType = { "Content-Type": "application/json" };

export const sendJson = (
  response: ServerResponse,
  statusCode: number,
  body: unknown,
): void => {
  response.writeHead(statusCode, jsonContentType);
  response.end(JSON.stringify(body));
};
