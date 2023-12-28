import {
  Dispatch, SetStateAction, createContext, MouseEvent,
} from 'react';
import { Todo, Filter } from '../types';

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
  activeTodosNum: number,
  completedTodosNum: number,
  handleFilterChange: (event: MouseEvent<HTMLAnchorElement>) => void,
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
