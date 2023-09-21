import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Filter } from '../../types/filter';
import { Todo } from '../../types/Todo';

type Props = {
  filter: Filter,
  setFilter: (f: Filter) => void,
  todos: Todo[],
};

export const Footer: React.FC<Props> = ({ filter, setFilter, todos }) => {
  const notCompletedTodos: Todo[] = useMemo(() => {
    return todos.filter(todo => todo.completed === false);
  }, [todos]);

  const completedTodos: Todo[] = useMemo(() => {
    return todos.filter(todo => todo.completed === true);
  }, [todos]);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${notCompletedTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filter === Filter.ALL },
          )}
          data-cy="FilterLinkAll"
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
          data-cy="FilterLinkActive"
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
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        style={{
          visibility: completedTodos.length > 0 ? 'visible' : 'hidden',
        }}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>

    </footer>
  );
};
