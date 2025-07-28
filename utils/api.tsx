
export async function postApi<T>(url: string, data: any, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    body: JSON.stringify(data),
    ...options,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// import { useMutation } from '@tanstack/react-query';
// import { postApi } from '../utils/api';

// const mutation = useMutation({
//   mutationFn: (data) => postApi('/your-endpoint', data),
// });