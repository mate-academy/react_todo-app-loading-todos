import React, { ReactNode, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { ErrorType } from '../Error/Error.types';

export interface Props {
  children: ReactNode
}

export interface Value {
  todos: Todo[],
  todosCount: number,
  setTodosCount: React.Dispatch<SetStateAction<number>>,
  setTodos: React.Dispatch<SetStateAction<Todo[]>>,
  errorMessage: ErrorType,
  setErrorMessage: React.Dispatch<SetStateAction<ErrorType>>
}
