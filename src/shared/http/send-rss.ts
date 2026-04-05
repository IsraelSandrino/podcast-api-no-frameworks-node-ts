import { ServerResponse } from "http";

const rssContentType = { "Content-Type": "application/rss+xml" };

export const sendRss = (
  response: ServerResponse,
  statusCode: number,
  body: string,
): void => {
  response.writeHead(statusCode, rssContentType);
  response.end(body);
};
