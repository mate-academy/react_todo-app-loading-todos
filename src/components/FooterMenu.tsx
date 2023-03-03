import { FC } from 'react';
import classNames from 'classnames';

import { ActiveTodoData } from '../types/ActiveTodoData';
import { Filter } from '../types/Filter';

type Props = {
  activeTodoData: ActiveTodoData,
  filter: Filter;
  setFilter: (filter: Filter) => void,
};

export const FooterMenu: FC<Props> = ({
  activeTodoData,
  filter,
  setFilter,
}) => (
  <footer
    className="todoapp__footer"
  >
    <span className="todo-count">
      {`${activeTodoData.activeLeft} items left`}
    </span>

    <nav className="filter">
      <a
        href="#/"
        className={classNames(
          'filter__link',
          { selected: filter === Filter.All },
        )}
        onClick={() => setFilter(Filter.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames(
          'filter__link',
          { selected: filter === Filter.Active },
        )}
        onClick={() => setFilter(Filter.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames(
          'filter__link',
          { selected: filter === Filter.Completed },
        )}
        onClick={() => setFilter(Filter.Completed)}
      >
        Completed
      </a>
    </nav>

    <button type="button" className="todoapp__clear-completed">
      Clear completed
    </button>
  </footer>
);
