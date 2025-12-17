import type { Todo } from './Todo';
export type HeaderType = {
  onVal: string;
  todosItemsList: Todo[];
  onAllItems: boolean;
  onChangeVal: (value: string) => void;
  onTodoList: (value: Todo[]) => void;
  onUpdate: (value: Todo) => void;
  onAdd: ({ completed, title, userId }: Omit<Todo, 'id'>) => void;
  onError: (value: string | null) => void;
};
