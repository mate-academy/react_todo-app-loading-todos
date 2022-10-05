import { FormEvent } from 'react';
import { Todo } from '../../types/Todo';

export type HeaderProps = {
  handleChooseAll: () => void;
  todoList: Todo[];
  updateTodoCompleted: (todoId: number, state: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  todoTitle: string;
  setTodoTitle: (input: string) => void;
  isLoading: boolean;
};
