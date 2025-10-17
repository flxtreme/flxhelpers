
import fetch, { HeadersInit } from "node-fetch"; // or global fetch in Node 18+

export type ServerFetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  token?: string;        // Optional Bearer token for authorization
  signal?: AbortSignal;  // Optional cancellation
};

export type ServerFetcherResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};

/**
 * serverFetcher.ts
 * -------------------------
 * A Node / server-side HTTP request helper.
 * Designed for APIs, backend services, or SSR environments.
 * Supports JSON requests/responses, optional auth tokens, and abort signals.
 * 
 * @example
 * ```ts
 * const response = await fetcher<{ id: number; title: string }[]>("/api/posts", {
 *   method: "GET",
 *   token: accessToken
 * });
 * 
 * if (response.error) console.error(response.error);
 * else console.log(response.data);
 * ```
 */
export default async function fetcher<T = any>(
  url: string,
  options: ServerFetcherOptions = {}
): Promise<ServerFetcherResponse<T>> {
  const { method = "GET", headers = {}, body, token, signal } = options;

  // Build Authorization header if token is provided
  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...authHeaders,
    } as HeadersInit,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const status = res.status;
  let data: T | undefined;
  let error: string | undefined;

  try {
    data = (await res.json()) as T;
  } catch {
    error = res.statusText || "Failed to parse JSON";
  }

  if (!res.ok && !error) {
    error = res.statusText;
  }

  return { data, error, status };
}
