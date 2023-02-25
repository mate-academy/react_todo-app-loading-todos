import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterTodos } from '../types/FilterTodos';

type Props = {
  itemsLeft: Todo[];
  selectFilter: string;
  setSelectFilter: (filter: FilterTodos) => void
  allCompleted: Todo[];
  onClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  itemsLeft,
  selectFilter,
  setSelectFilter,
  allCompleted,
  onClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: selectFilter === FilterTodos.ALL },
          )}
          onClick={() => setSelectFilter(FilterTodos.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: selectFilter === FilterTodos.ACTIVE },
          )}
          onClick={() => setSelectFilter(FilterTodos.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: selectFilter === FilterTodos.COMPLETED },
          )}
          onClick={() => setSelectFilter(FilterTodos.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { visible: !allCompleted.length },
        )}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>

    </footer>
  );
};
