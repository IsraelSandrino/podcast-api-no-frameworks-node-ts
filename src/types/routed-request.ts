import { IncomingMessage } from "http";

export interface RoutedRequest extends IncomingMessage {
  params?: Record<string, string>;
}
