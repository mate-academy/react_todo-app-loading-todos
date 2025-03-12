import { Todo } from '../../types/Todo';
import React from 'react';

export type TodoListTypes = {
  todos: Todo[];
  onSelected: React.Dispatch<React.SetStateAction<Todo | null>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: (text: string) => void;
};
