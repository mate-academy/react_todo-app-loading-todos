import { Todo } from './Todo';

export type UIEditingStates = {
  isFocusTitle: boolean;
  selectedTodo: Todo | null;
};
