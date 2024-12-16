/* eslint-disable @typescript-eslint/indent */

import { Completed } from '../types/Completed';
import { Todo } from '../types/Todo';

export const getCompletedTodos = (todos: Todo[]) =>
  todos.reduce(
    (completed: Completed[], todo) =>
      todo.completed ? [...completed, { id: todo.id }] : completed,
    [],
  );
