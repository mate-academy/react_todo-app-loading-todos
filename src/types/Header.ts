export interface HeaderProps {
  loading: boolean;
  todosLeft: number;
  newTodo: string;
  setNewTodo: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onToggleAll: () => void;
}
