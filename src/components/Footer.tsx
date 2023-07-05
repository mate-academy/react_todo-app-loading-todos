import { TodoFilter } from './TodoFilter';
import { Todo } from '../types/Todo';
import { FilterValue } from '../utils/FilterValue';

type Props = {
  setFilterValue: (filterValue: FilterValue) => void;
  filterValue: string;
  completedTodos: Todo[];
  activeTodos: Todo[];
};

export const Footer: React.FC <Props> = ({
  setFilterValue, filterValue, completedTodos, activeTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
      {`${activeTodos.length} items left`}
      </span>

      <TodoFilter setFilterValue={setFilterValue} filterValue={filterValue} />
      {completedTodos.length && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      ) }
    </footer>
  );
};
