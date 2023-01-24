import cn from 'classnames';
import { memo } from 'react';

interface FooterProps {
  countActiveTodos: number,
  selectedFilterForTodos: string,
  onChosedFilter: (str: 'all' | 'active' | 'completed') => void,
}

export const Footer: React.FC<FooterProps> = memo(({
  countActiveTodos,
  selectedFilterForTodos,
  onChosedFilter,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${countActiveTodos} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={cn('filter__link', {
          selected: selectedFilterForTodos === 'all',
        })}
        onClick={() => onChosedFilter('all')}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={cn('filter__link', {
          selected: selectedFilterForTodos === 'active',
        })}
        onClick={() => onChosedFilter('active')}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={cn('filter__link', {
          selected: selectedFilterForTodos === 'completed',
        })}
        onClick={() => onChosedFilter('completed')}
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
));
