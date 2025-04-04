import React from 'react';
import { Todo } from '../../types/Todo';

export type HeaderTypes = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleLoading: (id: number) => void;
  setError: (text: string) => void;
  error?: string;
};
