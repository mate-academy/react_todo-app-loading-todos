import React from 'react';
import classNames from 'classnames';
import { FilterTodoBy } from '../../types/FilterTodoBy';

interface Props {
  typeFilter: FilterTodoBy;
  onChangeFilter: (type: FilterTodoBy) => void;
}

export const TodoFilter: React.FC<Props> = ({ typeFilter, onChangeFilter }) => (
  <nav className="filter">
    <a
      href="#/"
      className={classNames('filter__link', {
        selected: typeFilter === FilterTodoBy.ALL,
      })}
      onClick={() => onChangeFilter(FilterTodoBy.ALL)}
    >
      All
    </a>

    <a
      href="#/active"
      className={classNames('filter__link', {
        selected: typeFilter === FilterTodoBy.ACTIVE,
      })}
      onClick={() => onChangeFilter(FilterTodoBy.ACTIVE)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={classNames('filter__link', {
        selected: typeFilter === FilterTodoBy.COMPLETED,
      })}
      onClick={() => onChangeFilter(FilterTodoBy.COMPLETED)}
    >
      Completed
    </a>
  </nav>
);
