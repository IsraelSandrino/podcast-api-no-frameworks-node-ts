import * as http from "http";
import { registerRoutes } from "./routes/register-routes";

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse,
) => {
  await registerRoutes(request, response);
};
