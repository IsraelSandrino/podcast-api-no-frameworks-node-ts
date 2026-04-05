import { IncomingMessage } from "node:http";

export const bodyParser = async <T>(request: IncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      // Decisão de contrato: requests sem body retornam objeto vazio para manter handlers com payload opcional.
      if (!body.trim()) {
        resolve({} as T);
        return;
      }

      try {
        resolve(JSON.parse(body) as T);
      } catch {
        // JSON invalido e propagado para o handler central (withErrorHandler), que converte para HTTP 400.
        reject(new Error("INVALID_JSON"));
      }
    });

    request.on("error", reject);
  });
};
