export interface TodoContextType {
  todos: Todo[],
  error: Errors | null;
  filterTodos: FilterType,
  handleShowError: (err: Errors) => void,
  handleSetFilterTodos: (filterType: FilterType) => void,
  closeErrorMessage: () => void
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum Errors {
  Add = 'Unable to add a todo',
  Delete = 'Unable to delete a todo',
  Update = 'Unable to update a todo',
}

export type FilterType = 'all' | 'active' | 'completed';

export type Props = React.PropsWithChildren<{}>;
