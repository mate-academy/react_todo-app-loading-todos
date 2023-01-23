import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  filterTodos: string,
  todosLeft: Todo[],
  onClickAll: () => void,
  onClickActive: () => void,
  onClickCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  filterTodos,
  todosLeft,
  onClickAll,
  onClickActive,
  onClickCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {filterTodos
        ? (
          <span className="todo-count" data-cy="todosCounter">
            {`${todosLeft.length} items left`}
          </span>
        ) : (
          <span className="todo-count" data-cy="todosCounter">
            0 items left
          </span>
        )}

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn(
            'filter__link',
            { selected: filterTodos === 'All' },
          )}
          onClick={onClickAll}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn(
            'filter__link',
            { selected: filterTodos === 'Active' },
          )}
          onClick={onClickActive}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: filterTodos === 'Completed' },
          )}
          onClick={onClickCompleted}
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
