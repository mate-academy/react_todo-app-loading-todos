import React from 'react';
import cn from 'classnames';
import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

type Props = {
  filter: FilterType,
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  todos,
  setTodos,
}) => {
  const hasCompletedTodos = todos.some(todo => todo.completed === true);
  const uncompletedTodos = todos.filter(todo => todo.completed === false);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${uncompletedTodos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link ', {
            selected: filter === FilterType.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterType.ALL)}
        >
          {FilterType.ALL}
        </a>

        <a
          href="#/active"
          className={cn('filter__link ', {
            selected: filter === FilterType.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterType.ACTIVE)}
        >
          {FilterType.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={cn('filter__link ', {
            selected: filter === FilterType.COMLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterType.COMLETED)}
        >
          {FilterType.COMLETED}
        </a>
      </nav>

      {hasCompletedTodos && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => setTodos(uncompletedTodos)}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
