import { Todo } from '../types/Todo';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'; // Exemplo de URL base

export const USER_ID = 3177; // Seu ID de usuário fixo

// Função auxiliar para lidar com as requisições
async function request<T>(
  url: string,
  method: string = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to ${method} ${url}: ${response.statusText}`);
  }

  if (response.status !== 204) {
    return response.json();
  }

  return {} as T; // Retorna um objeto vazio para 204
}

// Funções de API simplificadas

export function getTodos(): Promise<Todo[]> {
  return request<Todo[]>(`${BASE_URL}?userId=${USER_ID}`);
}

export function addTodos(todoData: Omit<Todo, 'id' | 'userId'>): Promise<Todo> {
  // Omitimos 'id' e 'userId' da entrada, pois 'id' é gerado e 'userId' é fixo
  return request<Todo>(BASE_URL, 'POST', {
    ...todoData,
    userId: USER_ID, // Adiciona o userId fixo internamente
  });
}

export function deleteTodo(todoId: number): Promise<void> {
  return request<void>(`${BASE_URL}/${todoId}`, 'DELETE');
}

export function patchTodos(
  todoData: Partial<Todo> & { id: number },
): Promise<Todo> {
  const dataToSend = { ...todoData, userId: USER_ID };

  return request<Todo>(`${BASE_URL}/${todoData.id}`, 'PATCH', dataToSend);
}
