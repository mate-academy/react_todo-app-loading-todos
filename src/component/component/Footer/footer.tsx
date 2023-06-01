// import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../../types/Todo';
import { GetFilter } from '../../../types/GetFilter';

type Props = {
  select: GetFilter,
  onSelect: (filter: GetFilter) => void;
  filteredTodos: Todo[];
};

export const Footer: React.FC<Props> = (
  {
    onSelect,
    select,
    filteredTodos,
  },
) => {
  const setCount = filteredTodos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${setCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: select === GetFilter.ALL },
          )}
          onClick={() => onSelect(GetFilter.ALL)}
        >
          All
        </a>

        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: select === GetFilter.ACTIVE },
          )}
          onClick={() => onSelect(GetFilter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: select === GetFilter.COMPLETED },
          )}
          onClick={() => onSelect(GetFilter.COMPLETED)}
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
