type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  token?: string;        // optional access token
  signal?: AbortSignal;
};

export type FetcherResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};

/**
 * fetcher
 * -------------------------
 * A flexible, TypeScript-friendly HTTP request helper for React and browser environments.
 * Simplifies making JSON-based API calls with optional authentication and abort signals.
 * 
 * @example
 * ```ts
 * const response = await fetcher<{ id: number; title: string }[]>("/api/posts", {
 *   method: "GET",
 *   token: localStorage.getItem("accessToken") || undefined
 * });
 * 
 * if (response.error) console.error(response.error);
 * else console.log(response.data);
 * ```
 */
export default async function fetcher<T = any>(
  url: string,
  options: FetcherOptions = {}
): Promise<FetcherResponse<T>> {
  const { method = "GET", headers = {}, body, token, signal } = options;

  const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...authHeaders,
    } as HeadersInit, // ✅ cast here
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const status = res.status;
  let data: T | undefined = undefined;
  let error: string | undefined = undefined;

  if (res.ok) {
    data = (await res.json()) as T;
  } else {
    try {
      const json = await res.json();
      error = json?.message || res.statusText;
    } catch {
      error = res.statusText;
    }
  }

  return { data, error, status };
}
