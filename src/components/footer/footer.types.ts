import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export type FooterTypes = {
  todos: Todo[];
  handleSelectTodo: (action: Status) => void;
  selectedStatus: Status;
};
