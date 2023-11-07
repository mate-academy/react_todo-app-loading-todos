import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[],
  filterBy: Filter,
  onFilterClick: (value: Filter) => void;
};

export const TodoappFilter: React.FC<Props> = ({
  todos,
  filterBy,
  onFilterClick,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} items left`}
      </span>

      {/* // Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(item => (
          <a
            key={item}
            href={`#/${Filter.ALL ? '' : item.toLowerCase()}`}
            className={cn('filter__link', {
              selected: item === filterBy,
            })}
            data-cy={`FilterLink${item}`}
            onClick={() => onFilterClick(item)}
          >
            {item}
          </a>
        ))}
      </nav>
    </>
  );
};
