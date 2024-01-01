import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { Todo } from './Todo';
import { Filter } from './Filter';

export interface AppContextType {
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  selectedFilter: Filter,
  setSelectedFilter: Dispatch<SetStateAction<Filter>>,
  showError: boolean,
  setShowError: Dispatch<SetStateAction<boolean>>,
  errorMessage: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  filteredTodos: Todo[],
  handleFilterChange: (event: MouseEvent<HTMLAnchorElement>) => void,
}
