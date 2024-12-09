import classNames from 'classnames';
import { TodoState } from '../../types/TodoState';

type Props = {
  activeTodosCount: number;
  completedTodosCount: number;
  activeFilter: TodoState;
  setActiveFilter: (state: TodoState) => void;
};

export const Footer = ({
  activeTodosCount,
  completedTodosCount,
  activeFilter,
  setActiveFilter,
}: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: activeFilter === TodoState.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setActiveFilter(TodoState.ALL)}
        >
          {TodoState.ALL}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: activeFilter === TodoState.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setActiveFilter(TodoState.ACTIVE)}
        >
          {TodoState.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: activeFilter === TodoState.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setActiveFilter(TodoState.COMPLETED)}
        >
          {TodoState.COMPLETED}
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
