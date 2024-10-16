import { Todo } from './Todo';
import { FilterStates } from '../types/enums';

export interface ErrorNotificationProps {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface FooterProps {
  todos: Todo[];
  filter: FilterStates;
  setFilter: React.Dispatch<React.SetStateAction<FilterStates>>;
}

export interface HeaderProps {
  allCompleted: boolean;
}

export interface TodoItemProps {
  todo: Todo;
}

export interface TodoListProps {
  todos: Todo[];
}
