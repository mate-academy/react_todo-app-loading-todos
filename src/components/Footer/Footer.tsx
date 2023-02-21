import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getTodos, getCompleted, getActive } from '../../api/todos';
import { Options } from '../../types/Options';

type Props = {
  onFilterClick: (func: (id: number) => Promise<Todo[]>) => void
};

export const Footer: React.FC<Props> = React.memo(
  ({ onFilterClick }) => {
    const [selectedOption, setSelectedOption] = useState<string>(Options.ALL);

    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          3 items left
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          { Object.values(Options).map(option => (
            <a
              key={option}
              href={`#/${option.toLowerCase()}`}
              className={classNames(
                'filter__link',
                { selected: selectedOption === option },
              )}
              onClick={() => {
                switch (option) {
                  case 'Active':
                    onFilterClick(getActive);
                    break;
                  case 'Completed':
                    onFilterClick(getCompleted);
                    break;
                  default:
                    onFilterClick(getTodos);
                }

                setSelectedOption(option);
              }}
            >
              {option}
            </a>
          ))}
        </nav>

        {/* don't show this button if there are no completed todos */}
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>
    );
  },
);
