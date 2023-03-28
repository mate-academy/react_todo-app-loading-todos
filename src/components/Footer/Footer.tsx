import classNames from 'classnames';
import React from 'react';
import { FilterParam } from '../../types/FilterParam';
import { Todo } from '../../types/Todo';
import { checkCompletedTodo, counterOfActiveTodos } from '../../api/todos';

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
  const changedFilter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href')?.replace('#/', '');

    switch (href) {
      case 'all':
        setFilterType(FilterParam.All);
        break;

      case 'active':
        setFilterType(FilterParam.Active);
        break;

      case 'completed':
        setFilterType(FilterParam.Completed);
        break;

      default:
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${counterOfActiveTodos(todos)} items left`}
      </span>

      <nav className="filter">
        {['All', 'Active', 'Completed'].map(link => (
          <a
            href={`#/${link.toLowerCase()}`}
            className={classNames(
              'filter__link',
              {
                selected: link === filterType,
              },
            )}
            onClick={changedFilter}
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
