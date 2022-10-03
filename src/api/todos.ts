import { Todo } from '../types/Todo';
import { TodosFilter } from '../types/TodosFilter_Enum';
import { client } from '../utils/fetchClient';

function filter(filterValue: TodosFilter) {
  switch (filterValue) {
    case TodosFilter.Active:
      return '&completed=false';
      break;
    case TodosFilter.Completed:
      return '&completed=true';
      break;
    default:
      return '';
      break;
  }
}

export const getTodos = (userId: number, filterValue: TodosFilter) => {
  const url = `/todos?userId=${userId}${filter(filterValue)}`;

  return client.get<Todo[]>(url);
};

// Add more methods here

export const createTodo = (todo: Todo) => {
  const url = '/todos';

  return client.post<Todo>(url, todo);
};

export const changeTodoStatus = (todoId: number, completed: boolean) => {
  const url = `/todos/${todoId}`;

  return client.patch<Todo>(url, { completed });
};

export const deleteTodo = (todoId: number) => {
  const url = `/todos/${todoId}`;

  return client.delete(url);
};
