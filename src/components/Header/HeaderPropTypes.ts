import { LegacyRef } from 'react';
import { Todo } from '../../types/Todo';

export type Props = {
  newTodoField : LegacyRef<HTMLInputElement> | undefined;
  userId: number | undefined;
  addInVisibleTodos: (newTodo: Todo) => void;
  setIsLoading: (state: boolean) => void;
  setErrorMessage: (state: string) => void;
  selectAllTodos: () => void;
  isAllSelected: boolean;
};
