import cn from 'classnames';
import { Filter } from '../../types/common';

interface Props {
  filter: Filter | null;
  activeTodosQty: number;
  onFilter: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const Footer: React.FC<Props> = ({
  filter,
  activeTodosQty,
  onFilter,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {`${activeTodosQty} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        onClick={onFilter}
        className={cn('filter__link', {
          selected: !filter,
        })}
        data-cy="FilterLinkAll"
      >
        All
      </a>

      <a
        href="#/active"
        onClick={onFilter}
        className={cn('filter__link', {
          selected: filter === Filter.active,
        })}
        data-cy="FilterLinkActive"
      >
        Active
      </a>

      <a
        href="#/completed"
        onClick={onFilter}
        className={cn('filter__link', {
          selected: filter === Filter.completed,
        })}
        data-cy="FilterLinkCompleted"
      >
        Completed
      </a>
    </nav>

    {/* this button should be disabled if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
    >
      Clear completed
    </button>
  </footer>
);
