import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';
import { Filter } from './Filter';

interface Props {
  todos: Todo[];
  filterStatus: FilterStatus;
  handleFilterChange: (newFilter: FilterStatus) => void;
}

export const Footer = ({ todos, filterStatus, handleFilterChange }: Props) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {todos.filter((todo: Todo) => !todo.completed).length} items left
    </span>

    <Filter
      filterStatus={filterStatus}
      handleFilterChange={handleFilterChange}
    />

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={todos.every((todo: Todo) => !todo.completed)}
    >
      Clear completed
    </button>
  </footer>
);
