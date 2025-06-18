import { Todo } from './Todo';

export type HeaderProps = {
  todos: Todo[];
  query: string;
  setQuery: (value: string) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onToggleAll?: () => void;
  handleDelete: (id: number) => void;
  isLoading: boolean;
  selectedTodoId: number | null;
  handleToggleStatus: (id: number) => void;
};
