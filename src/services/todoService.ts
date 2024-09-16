import { Todo } from '../types/Todo';
import { getTodos, USER_ID } from '../api/todos';
import { addTodo } from '../api/todos';

export interface TodoService {
  getTodos: () => Promise<Todo[]>;
  addTodo: (todoTitle: string) => Promise<Todo>;
}

export const TodoServiceApi: TodoService = {
  getTodos: () => getTodos(),
  addTodo: (todoTitle: string) =>
    addTodo({
      title: todoTitle,
      userId: USER_ID,
      completed: false,
    }),
};
