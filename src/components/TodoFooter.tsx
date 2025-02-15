import classNames from 'classnames';
import { TypeFilter } from '../types/TypeFilter';
import React from 'react';

type Props = {
  filterBy: TypeFilter;
  setFilterBy: React.Dispatch<React.SetStateAction<TypeFilter>>;
  notCompletedTasksCounter: number;
};

export const TodoFooter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  notCompletedTasksCounter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTasksCounter} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(TypeFilter).map(todoType => (
          <a
            href={`#/${todoType}`}
            key={todoType}
            className={classNames('filter__link', {
              selected: todoType === filterBy,
            })}
            data-cy={`FilterLink${todoType}`}
            onClick={() => {
              setFilterBy(todoType);
            }}
          >
            {todoType}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className={classNames('todoapp__clear-completed', 'disabled')}
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
