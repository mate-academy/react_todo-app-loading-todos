import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { countActiveTodos, checkCompletedTodos } from '../../api/todos';

type Props = {
  todos: Todo[],
  filter: Filter,
  setFilter: (filterType: Filter) => void,
};

export const Footer: React.FC<Props> = ({ todos, setFilter, filter }) => {
  const changeFilter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href')?.replace('#/', '');

    switch (href) {
      case 'active':
        setFilter(Filter.Active);
        break;

      case 'completed':
        setFilter(Filter.Completed);
        break;

      case 'all':
        setFilter(Filter.All);
        break;

      default:
        break;
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countActiveTodos(todos)} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        {['All', 'Active', 'Completed'].map(link => (
          <a
            href={`#/${link.toLowerCase()}`}
            className={classNames(
              'filter__link',
              {
                selected: link === filter,
              },
            )}
            onClick={changeFilter}
          >
            {link}
          </a>
        ))}
      </nav>

      {checkCompletedTodos(todos) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
