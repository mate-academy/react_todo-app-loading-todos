import { LegacyRef } from 'react';
import { Todo } from '../../types/Todo';

export type Props = {
  newTodoField : LegacyRef<HTMLInputElement> | undefined;
  userId: number | undefined;
  addInVisibleTodos: (newTodo: Todo) => void;
  setLoadingTodoId: (state: number | null) => void;
  setErrorMessage: (state: string) => void;
  selectAllTodos: () => void;
  isAllSelected: boolean;
  setTemporaryTodo: (todo: Todo | null) => void;
};

export enum FilterType {
  All,
  Active,
  Completed,
}
