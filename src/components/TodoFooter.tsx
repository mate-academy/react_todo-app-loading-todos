import { FC } from 'react';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  filter: string,
  setFilter: (x :string) => void,
  itemsLeft: number;
};

export const TodoFooter: FC<Props> = ({ filter, setFilter, itemsLeft }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} item(s) left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.ALL,
          })}
          onClick={() => setFilter(Filter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.ACTIVE,
          })}
          onClick={() => setFilter(Filter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.COMPLETED,
          })}
          onClick={() => setFilter(Filter.COMPLETED)}
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
