import { FilterNav } from '../../types/Filter';
import { TodoNav } from '../TodoLink/TodoNav';

type Props = {
  handleFilter: (filterName: FilterNav) => void;
  selectFilter: FilterNav;
  totalItems: number;
  completedTodos: number;
};

export const TodoFooter: React.FC<Props> = ({
  handleFilter,
  selectFilter,
  totalItems,
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {totalItems - completedTodos} items left
      </span>

      <TodoNav handleFilter={handleFilter} selectFilter={selectFilter} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
