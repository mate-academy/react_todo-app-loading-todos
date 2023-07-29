import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { Filters } from '../../types/Filters';

type Props = {
  activeTodos: Todo[],
  completedTodos: Todo[],
  selectedFilter: Filters,
  onSetSelectedFilter: (char: Filters) => void,
};

export const Filter: React.FC<Props> = (
  {
    activeTodos, completedTodos, selectedFilter, onSetSelectedFilter,
  },
) => {
  return (
    <footer className="todoapp__footer">
      {' '}
      <span className="todo-count">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter">
        <button
          type="button"
          className={classNames(
            'filter__link', { selected: selectedFilter === 'all' },
          )}
          onClick={() => onSetSelectedFilter(Filters.all)}
        >
          All
        </button>

        <button
          type="button"
          className={classNames(
            'filter__link', { selected: selectedFilter === 'active' },
          )}
          onClick={() => onSetSelectedFilter(Filters.active)}
        >
          Active
        </button>

        <button
          type="button"
          className={classNames(
            'filter__link', { selected: selectedFilter === 'completed' },
          )}
          onClick={() => onSetSelectedFilter(Filters.completed)}
        >
          Completed
        </button>
      </nav>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed', { hidden: completedTodos.length < 1 },
        )}
      >
        Clear completed
      </button>
    </footer>
  );
};
