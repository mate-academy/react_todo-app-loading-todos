import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getTodos, getCompleted, getActive } from '../../api/todos';

type Props = {
  onFilterClick: (func: (id: number) => Promise<Todo[]>) => void
};

export const Footer: React.FC<Props> = React.memo(
  ({ onFilterClick }) => {
    const [selectedOption, setSelectedOption] = useState<string>('all');

    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          3 items left
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          <a
            href="#/"
            className={classNames(
              'filter__link',
              { selected: selectedOption === 'all' },
            )}
            onClick={() => {
              onFilterClick(getTodos);
              setSelectedOption('all');
            }}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames(
              'filter__link',
              { selected: selectedOption === 'active' },
            )}
            onClick={() => {
              onFilterClick(getActive);
              setSelectedOption('active');
            }}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames(
              'filter__link',
              { selected: selectedOption === 'completed' },
            )}
            onClick={() => {
              onFilterClick(getCompleted);
              setSelectedOption('completed');
            }}
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
  },
);
