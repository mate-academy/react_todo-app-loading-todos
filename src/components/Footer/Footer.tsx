import { FC, memo } from 'react';
import cn from 'classnames';

interface Props {
  length: number;
  onFilter: (str: string) => void;
  filter: string;
}

export const Footer: FC<Props> = memo(({ length, onFilter, filter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn('filter__link', { selected: filter === 'all' })}
          onClick={() => onFilter('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link', { selected: filter === 'active' })}
          onClick={() => onFilter('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link', { selected: filter === 'completed' })}
          onClick={() => onFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
});
