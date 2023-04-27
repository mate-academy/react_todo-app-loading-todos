// import classNames from "classnames"
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  setFilterType: (value: string) => void,
  filterType: string,
  visibleTodos: Todo[];
};

export const Footer: React.FC<Props> = ({
  setFilterType,
  filterType,
  visibleTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {visibleTodos.length}
        {' '}
        items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === 'All',
          })}
          onClick={() => setFilterType('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === 'Active',
          })}
          onClick={() => setFilterType('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === 'Completed',
          })}
          onClick={() => setFilterType('Completed')}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={() => setFilterType('Active')}
      >
        Clear completed
      </button>
    </footer>
  );
};
