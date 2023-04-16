import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const showErrorNotification = (errorMessage: string) => {
  const notification = document.querySelector('.notification');

  if (notification) {
    notification.classList.remove('hidden');
    notification.innerHTML = errorMessage;
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }
};

export const getTodos = async (userId: number) => {
  try {
    const response = await client.get<Todo[]>(`/todos?userId=${userId}`);

    return response;
  } catch (error) {
    const errorMessage = 'Unable to get todos';

    showErrorNotification(errorMessage);
    throw error;
  }
};

export const postTodos = async (userId: number) => {
  try {
    const response = await client.post<Todo[]>(`/todos?userId=${userId}`, { userId });

    return response;
  } catch (error) {
    const errorMessage = 'Unable to add todo';

    showErrorNotification(errorMessage);
    throw error;
  }
};

export const updateTodos = async (
  userId: number, todoId: number, todo: Todo,
) => {
  try {
    const response = await client.patch<Todo[]>(`/todos/${todoId}?userId=${userId}`, todo);

    return response;
  } catch (error) {
    const errorMessage = 'Unable to update todo';

    showErrorNotification(errorMessage);
    throw error;
  }
};

export const deleteTodos = async (userId: number, todoId: number) => {
  try {
    const response = await client.delete(`/todos/${todoId}?userId=${userId}`);

    return response;
  } catch (error) {
    const errorMessage = 'Unable to delete todo';

    showErrorNotification(errorMessage);
    throw error;
  }
};
