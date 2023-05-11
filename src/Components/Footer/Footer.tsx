import { FC } from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const Footer: FC<Props> = ({ filter, setFilter }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">3 items left</span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          onClick={() => setFilter(Filter.All)}
          className={classNames('filter__link', {
            selected: filter === Filter.All,
          })}
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => setFilter(Filter.Active)}
          className={classNames('filter__link', {
            selected: filter === Filter.Active,
          })}
        >
          Active
        </a>

        <a
          href="#/completed"
          onClick={() => setFilter(Filter.Completed)}
          className={classNames('filter__link', {
            selected: filter === Filter.Completed,
          })}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
