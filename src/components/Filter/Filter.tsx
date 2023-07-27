import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { Filters } from '../../types/Filters';

type Props = {
  activeTodos: Todo[],
  complitedTodos: Todo[],
  selectedFilter: Filters,
  onSetSelectedFilter: (char: Filters) => void,
};

export const Filter: React.FC<Props> = (
  {
    activeTodos, complitedTodos, selectedFilter, onSetSelectedFilter,
  },
) => {
  return (
    <footer className="todoapp__footer">
      {' '}
      {/* Hide the footer if there are no todos */}
      <span className="todo-count">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link', { selected: selectedFilter === 'all' },
          )}
          onClick={() => onSetSelectedFilter(Filters.all)}
        >
          All
        </a>

        <a
          href="#/"
          className={classNames(
            'filter__link', { selected: selectedFilter === 'active' },
          )}
          onClick={() => onSetSelectedFilter(Filters.active)}
        >
          Active
        </a>

        <a
          href="#/"
          className={classNames(
            'filter__link', { selected: selectedFilter === 'completed' },
          )}
          onClick={() => onSetSelectedFilter(Filters.completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed', { hidden: complitedTodos.length < 1 },
        )}
      >
        Clear completed
      </button>
    </footer>
  );
};
