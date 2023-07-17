import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

interface Props {
  todosShow: Todo[],
  filter: Filter,
  setFilter: (filter: Filter) => void,
}

export const Footer: React.FC<Props> = ({
  todosShow,
  filter,
  setFilter,
}) => {
  const incompleteTodoCount = todosShow.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todocount">
        {`${incompleteTodoCount} items left`}
      </span>
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filter === Filter.ALL },
          )}
          onClick={() => setFilter(Filter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filter === Filter.ACTIVE },
          )}
          onClick={() => setFilter(Filter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filter === Filter.COMPLETED },
          )}
          onClick={() => setFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={() => {

        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
