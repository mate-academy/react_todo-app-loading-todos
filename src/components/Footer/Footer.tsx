import classNames from 'classnames';
import { FC, FormEvent, useMemo } from 'react';
import { Todo } from '../../types/Todo';

export type Filter = 'all' | 'completed' | 'active';

interface Props {
  todos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const Footer: FC<Props> = ({ todos, filter, setFilter }) => {
  const count = useMemo(() => todos.filter(t => !t.completed).length, [todos]);

  const handleSetFilter = (f: Filter) => (e: FormEvent) => {
    e.preventDefault();
    setFilter(f);
  };

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {count} items left
      </span>
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={handleSetFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={handleSetFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleSetFilter('completed')}
        >
          Completed
        </a>
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!count}
      >
        Clear completed
      </button>
    </footer>
  );
};
