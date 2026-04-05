import { ServerResponse } from "http";

export const sendNoContent = (response: ServerResponse): void => {
  response.writeHead(204);
  response.end();
};
