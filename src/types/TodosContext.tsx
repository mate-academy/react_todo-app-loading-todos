import { ListAction } from '../Enum/ListAction';
import { Todo } from './Todo';

export type TodosContext = {
  todo: Todo[],
  setTodo: (value: Todo[]) => void,
  filter: ListAction,
  setFilter: (value: ListAction) => void,
  filterTodos: () => Todo[],
  isToggleAll: boolean;
  setIsToggleAll: (ListAction: boolean) => void,
};
