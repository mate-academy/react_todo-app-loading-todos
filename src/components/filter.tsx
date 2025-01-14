import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
  todos: Todo[];
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
  filterBy: string;
};

export const Filter: React.FC<Props> = ({
  errorMessage,
  todos,
  filterBy,
  setFilterBy,
}) => {
  return (
    <>
      {!errorMessage && todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`0 items left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            {['All', 'Active', 'Completed'].map(item => (
              <a
                key={item}
                href={`#/${item}`}
                className={classNames('filter__link', {
                  selected: filterBy === item,
                })}
                data-cy={`FilterLink${item}`}
                onClick={() => {
                  setFilterBy(item);
                }}
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
