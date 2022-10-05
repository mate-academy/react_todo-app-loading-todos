import cn from 'classnames';
import { TodoFilter } from '../../../types/TodoFilter';

type Props = {
  filter: string,
  setFilter: (s: string) => void,
};

export const Footer: React.FC<Props>
= ({
  setFilter, filter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn('filter__link',
            { selected: filter === TodoFilter.All })}
          onClick={() => {
            setFilter(TodoFilter.All);
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link',
            { selected: filter === TodoFilter.Active })}
          onClick={() => {
            setFilter(TodoFilter.Active);
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link',
            { selected: filter === TodoFilter.Completed })}
          onClick={() => {
            setFilter(TodoFilter.Completed);
          }}
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
};
