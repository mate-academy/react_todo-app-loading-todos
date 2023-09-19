import React from 'react';
import classNames from 'classnames';

import { FilterParam } from '../utils/FilterParam';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  isOneTodoCompleted: boolean;
  filterParam: FilterParam;
  setFilterParam: (newValue: FilterParam) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  isOneTodoCompleted,
  filterParam,
  setFilterParam,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <nav className="filter">
        {Object.keys(FilterParam).map((key) => {
          const value = FilterParam[key as keyof typeof FilterParam];

          return (
            <a
              href={`#/${value}`}
              className={classNames('filter__link', {
                selected: value === filterParam,
              })}
              onClick={() => setFilterParam(value)}
            >
              {key}
            </a>
          );
        })}
      </nav>
      {isOneTodoCompleted && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
