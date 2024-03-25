import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter';

type Props = {
  activeTodos: Todo[];
  currentFilter: Filter;
  setFilter: (status: Filter) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodos: { length },
  currentFilter,
  setFilter,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {length} items left
    </span>

    <TodoFilter currentFilter={currentFilter} onFilterClick={setFilter} />

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!!length}
    >
      Clear completed
    </button>
  </footer>
);
