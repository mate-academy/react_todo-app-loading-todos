const BASE_URL = '/';

const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  await wait(150);

  const response = await fetch(BASE_URL + url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body: unknown) =>
    request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
