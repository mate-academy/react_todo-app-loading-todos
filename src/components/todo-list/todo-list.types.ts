import { Todo } from '../../types/Todo';
import React from 'react';

export type TodoListTypes = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isLoadingId: number | null;
  setIsLoadingId: React.Dispatch<React.SetStateAction<number | null>>;
  setError: (text: string) => void;
};
