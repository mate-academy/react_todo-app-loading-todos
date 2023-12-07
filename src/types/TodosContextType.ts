import { Dispatch, SetStateAction } from 'react';
import { Todo } from './Todo';

export interface TodosContextType {
  todos: Todo[] | null,
  setTodos: Dispatch<SetStateAction<Todo[] | null>>
  errorMessage: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  preparedTodos: Todo[] | null,
  sortQuery: string,
  setSortQuery: Dispatch<SetStateAction<string>>
}
