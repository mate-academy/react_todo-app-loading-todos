import classNames from 'classnames';
import React from 'react';
import { FilterParam } from '../../types/FilterParam';
import { Todo } from '../../types/Todo';
import {
  checkCompletedTodo,
  counterOfActiveTodos,
} from '../../Helpers/helpers';

type Props = {
  todos: Todo[],
  filterType: FilterParam,
  setFilterType: (type: FilterParam) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filterType,
  setFilterType,
}) => {
  const handleFilterChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.text;

    switch (href) {
      case FilterParam.All:
        return setFilterType(FilterParam.All);

      case FilterParam.Active:
        return setFilterType(FilterParam.Active);

      case FilterParam.Completed:
        return setFilterType(FilterParam.Completed);

      default:
        return setFilterType(FilterParam.All);
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${counterOfActiveTodos(todos)} items left`}
      </span>

      <nav className="filter">
        {Object.values(FilterParam).map(link => (
          <a
            href={`#/${link.toLowerCase()}`}
            className={classNames(
              'filter__link',
              {
                selected: link === filterType,
              },
            )}
            onClick={handleFilterChange}
          >
            {link}
          </a>
        ))}
      </nav>

      {checkCompletedTodo(todos) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}

    </footer>
  );
};
