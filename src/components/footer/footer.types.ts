import { Todo } from '../../types/Todo';
import React from 'react';

export type FooterTypes = {
  count: number;
  selectedStatus: string;
  setSelectedStatus: (status: 'completed' | 'all' | 'active') => void;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isLoadingId: Record<number, boolean>;
  handleLoading: (id: number | null) => void;
  setError: (text: string) => void;
};
