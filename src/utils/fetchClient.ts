/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate.academy/students-api';

// returns a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface ErrorResponse {
  message: string;
}

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  userId?: number | null,
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };
  const finalUrl = userId ? `${BASE_URL + url}?userId=${userId}` : BASE_URL + url;

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // DON'T change the delay it is required for tests
  await wait(100);

  const response = await fetch(finalUrl, options);

  if (!response.ok) {
    // Attempt to parse error details from response
    try {
      const errorResponse: ErrorResponse = await response.json();

      throw new Error(errorResponse.message || 'Unknown error occurred');
    } catch (error) {
      // If parsing fails, throw a generic error
      throw new Error('Network error occurred');
    }
  }

  return response.json();
}

export const client = {
  get: <T>(url: string, userId?: number
  | null) => request<T>(url, 'GET', userId),
  post: <T>(url: string, userId: number
  | null, data: any) => request<T>(url, 'POST', userId, data),
  patch: <T>(url: string, userId: number
  | null, data: any) => request<T>(url, 'PATCH', userId, data),
  delete: (url: string, userId: number
  | null) => request(url, 'DELETE', userId),
};
