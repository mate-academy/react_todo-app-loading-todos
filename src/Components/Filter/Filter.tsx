import classNames from 'classnames';
import React from 'react';

import { Filters } from '../../types/Filters';

type Props = {
  filter: Filters;
  changeFilter: (value: Filters) => void;
};

const Filter: React.FC<Props> = ({ filter: selectedTodo, changeFilter }) => (
  <nav className="filter">
    <a
      href="#/"
      className={classNames(
        'filter__link',
        { selected: selectedTodo === Filters.All },
      )}
      onClick={() => changeFilter(Filters.All)}
    >
      All
    </a>

    <a
      href="#/active"
      className={classNames(
        'filter__link',
        { selected: selectedTodo === Filters.ACTIVE },
      )}
      onClick={() => changeFilter(Filters.ACTIVE)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={classNames(
        'filter__link',
        { selected: selectedTodo === Filters.COMPLETED },
      )}
      onClick={() => changeFilter(Filters.COMPLETED)}
    >
      Completed
    </a>
  </nav>
);

export default Filter;
