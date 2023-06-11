import React, { useContext, memo } from 'react';
import classNames from 'classnames';
import { FilterType, FilterTypeKey } from '../../types/FilterType';
import { TodoAppContext } from '../../TodoAppContext';

export const Footer: React.FC = memo(() => {
  const {
    activeTodos,
    filterType,
    visibleTodos,
    setFilterType,
  } = useContext(TodoAppContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} ${activeTodos.length <= 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {['All', 'Active', 'Completed'].map(item => (
          <a
            key={item}
            data-cy="FilterLinkAll"
            href={`#/${item !== 'All' ? item.toLowerCase() : ''}`}
            className={classNames('filter__link', {
              selected: filterType === item,
            })}
            onClick={() => (
              setFilterType(FilterType[item as FilterTypeKey])
            )}
          >
            {item}
          </a>
        ))}
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className={classNames('todoapp__clear-completed', {
          'todoapp__clear-completed-active': visibleTodos
            .some(todo => todo.completed),
        })}
      >
        Clear completed
      </button>
    </footer>
  );
});
