import React from 'react';
import cn from 'classnames';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  filter: Filter,
  setFilter: (filter: Filter) => void,
  todos: Todo[]
};

export const Footer: React.FC<Props> = ({ filter, setFilter, todos }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === Filter.ALL })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.ALL)}
        >
          {Filter.ALL}
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === Filter.ACTIVE })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.ACTIVE)}
        >
          {Filter.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: filter === Filter.COMPLETED })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.COMPLETED)}
        >
          {Filter.COMPLETED}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>

    </footer>
  );
};
