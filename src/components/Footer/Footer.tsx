import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[]
  filterType: FilterType,
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>,
};

export const Footer: React.FC<Props> = React.memo(
  ({
    todos,
    filterType,
    setFilterType,
  }) => {
    const completedTodos = useMemo(() => {
      return todos.filter(todo => todo.completed === false);
    }, [todos]);

    const completedTodo = useMemo(() => {
      return todos.some(todo => todo.completed === true);
    }, [todos]);

    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${completedTodos.length} items left`}
        </span>

        <nav className="filter centered">
          <a
            href="#/"
            className={classNames('filter__link', {
              'filter__link selected': filterType === FilterType.ALL,
            })}
            onClick={() => setFilterType(FilterType.ALL)}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              'filter__link selected': filterType === FilterType.ACTIVE,
            })}
            onClick={() => setFilterType(FilterType.ACTIVE)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              'filter__link selected': filterType === FilterType.COMPLETED,
            })}
            onClick={() => setFilterType(FilterType.COMPLETED)}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          disabled={!completedTodo}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);
