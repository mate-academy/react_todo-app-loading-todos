import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  methodToFilter: (status:string) => void;
  filterTypeTodos: string,
};

export const Footer: React.FC<Props> = ({
  todos,
  methodToFilter,
  filterTypeTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn('filter__link',
            { selected: filterTypeTodos === 'all' })}
          onClick={() => methodToFilter('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link',
            { selected: filterTypeTodos === 'active' })}
          onClick={() => methodToFilter('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link',
            { selected: filterTypeTodos === 'completed' })}
          onClick={() => methodToFilter('completed')}
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
