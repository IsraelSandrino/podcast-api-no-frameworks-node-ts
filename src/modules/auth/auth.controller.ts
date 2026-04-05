import { IncomingMessage, ServerResponse } from "http";
import { serviceLogin, serviceRegister } from "./auth.service";
import { sendJson } from "../../shared/http/send-json";
import { bodyParser } from "../../utils/body-parser";
import { StatusCode } from "../../utils/status-code";

interface AuthRequestBody {
  email: string;
  name?: string;
  password: string;
}

export const register = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const body = await bodyParser<AuthRequestBody>(request);
  const result = serviceRegister(body.name ?? "", body.email, body.password);

  sendJson(response, StatusCode.CREATED, result);
};

export const login = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const body = await bodyParser<AuthRequestBody>(request);
  const token = serviceLogin(body.email, body.password);

  if (!token) {
    sendJson(response, StatusCode.UNAUTHORIZED, {
      message: "Email ou senha incorretos!",
    });
    return;
  }

  sendJson(response, StatusCode.OK, { token });
};
