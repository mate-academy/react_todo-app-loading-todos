import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import cn from 'classnames';

type Props = {
  errorMessage: string;
  todos: Todo[];
  setFilterBy: Dispatch<SetStateAction<Filter>>;
  filterBy: string;
  todoCount: number;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterBy,
  setFilterBy,
  todoCount,
}) => {
  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todoCount} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            {Object.values(Filter).map(item => (
              <a
                href={`#/${item}`}
                key={item}
                className={cn('filter__link', { selected: filterBy === item })}
                data-cy={`FilterLink${item}`}
                onClick={() => setFilterBy(item)}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
