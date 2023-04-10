import classNames from 'classnames';
import React from 'react';
import { FilterTypes } from '../../types/FilterTypes';
import { Todo } from '../../types/Todo';
import { countActiveTodos, checkIsTodoCompleted } from '../helpers/helpers';

type Props = {
  todos: Todo[];
  filterType: FilterTypes;
  setFilterType: (type: FilterTypes) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filterType,
  setFilterType,
}) => {
  const handleFilterChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget.text;

    switch (link) {
      default:
      case FilterTypes.ALL:
        return setFilterType(FilterTypes.ALL);

      case FilterTypes.ACTIVE:
        return setFilterType(FilterTypes.ACTIVE);

      case FilterTypes.COMPLETED:
        return setFilterType(FilterTypes.COMPLETED);
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countActiveTodos(todos)} items left`}
      </span>

      <nav className="filter">
        {Object.values(FilterTypes).map(link => (
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

      {checkIsTodoCompleted(todos) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}

    </footer>
  );
};
