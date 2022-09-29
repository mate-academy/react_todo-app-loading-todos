import { FormEvent } from 'react';
import { Todo } from '../../types/Todo';
import { Error } from '../../Error';

export type HeaderProps = {
  setLoadingAll: (input: boolean) => void;
  todoList: Todo[];
  updateTodoCompleted: (todoId: number, state: boolean) => void;
  setError: (title: Error | null) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  todoTitle: string;
  setTodoTitle: (input: string) => void;
  isLoading: boolean;
};
