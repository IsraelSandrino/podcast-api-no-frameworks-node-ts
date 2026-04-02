import { IncomingMessage, ServerResponse } from "http";
import { ContentType } from "../utils/content-type";
import { bodyParser } from "../utils/body-parser";
import { StatusCode } from "../utils/status-code";
import { serviceLogin, serviceRegister } from "../services/auth-service";

const defaultContent = { "Content-Type": ContentType.JSON };

export const register = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const body = await bodyParser(request);
  serviceRegister(body.name, body.email, body.password);

  response.writeHead(StatusCode.CREATED, defaultContent);
  response.write(JSON.stringify(body));

  response.end(JSON.stringify({ message: "Usuário registrado com sucesso!" }));
};

export const login = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const body = await bodyParser(request);
  const token = serviceLogin(body.email, body.password);

  if (!token) {
    response.writeHead(StatusCode.UNAUTHORIZED, defaultContent);
    response.end(JSON.stringify({ message: "Email ou senha incorretos!" }));
    return;
  }

  response.writeHead(StatusCode.OK, defaultContent);
  response.write(JSON.stringify(body));

  response.end(JSON.stringify({ token }));
};
