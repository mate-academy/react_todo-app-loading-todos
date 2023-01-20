import classNames from 'classnames';
import { Todo } from '../../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[],
  filter: string,
  onAllClick: () => void,
  onActiveClick: () => void,
  onCompletedClick: () => void,
};

export const Filter: React.FC<Props> = ({
  filter,
  onAllClick,
  onActiveClick,
  onCompletedClick,
}) => {
  const compareFilter = (filterName: string) => {
    return classNames(
      'filter__link',
      {
        selected: filter === filterName,
      },
    );
  };

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="todosCounter">
          {` ${1} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            data-cy="FilterLinkAll"
            href="#/"
            className={compareFilter('all')}
            onClick={() => onAllClick()}
          >
            All
          </a>

          <a
            data-cy="FilterLinkActive"
            href="#/active"
            className={compareFilter('active')}
            onClick={() => onActiveClick()}
          >
            Active
          </a>
          <a
            data-cy="FilterLinkCompleted"
            href="#/completed"
            className={compareFilter('completed')}
            onClick={() => onCompletedClick()}
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
    </>
  );
};
