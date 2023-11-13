import React, { useContext } from 'react';
import cn from 'classnames';
import { Status } from './types/Status';
import { TodosContext } from './TodoContext';

export const TodoFilter: React.FC = () => {
  const {
    todosFilter,
    setTodosFilter,
  } = useContext(TodosContext);

  const handleLink = (val: string) => {
    if (Status.ALL) {
      return '#/';
    }

    return `#/${val.toLowerCase()}`;
  };

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(Status).map(val => (
        <a
          href={handleLink(val)}
          onClick={() => setTodosFilter(val)}
          data-cy={`FilterLink${val}`}
          className={cn('filter__link', {
            selected: todosFilter === val,
          })}
        >
          {val}
        </a>
      ))}
    </nav>
  );
};
