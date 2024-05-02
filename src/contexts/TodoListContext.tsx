import * as React from 'react';
import { Todo } from '../types/Todo';

type TodoListContextType = {
  todos: Todo[];
  errorMessage: string | null;
  loadCompletedTodos: () => void;
  loadActiveTodos: () => void;
  loadAllTodos: () => void;
};

export const TodoListContext = React.createContext<TodoListContextType>({
  todos: [],
  errorMessage: null,
  loadCompletedTodos: () => {},
  loadActiveTodos: () => {},
  loadAllTodos: () => {},
});
