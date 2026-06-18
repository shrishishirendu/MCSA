export async function readJsonResponse<T extends object>(
  response: Response
): Promise<T & { error?: string }> {
  const text = await response.text();

  if (!text) {
    return {
      error:
        response.status === 500
          ? "The server could not complete this request. Check the Supabase environment variables and database setup."
          : `The server returned an empty response (${response.status}).`
    } as T & { error?: string };
  }

  try {
    return JSON.parse(text) as T & { error?: string };
  } catch {
    return {
      error: `The server returned an invalid response (${response.status}).`
    } as T & { error?: string };
  }
}
