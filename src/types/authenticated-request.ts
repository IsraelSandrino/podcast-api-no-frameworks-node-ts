import { IncomingMessage } from "http";

export interface AuthUser {
  id: number;
  email: string;
}

export interface AuthenticatedRequest extends IncomingMessage {
  user?: AuthUser;
}
