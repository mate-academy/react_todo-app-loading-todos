import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  countActiveTodos: number;
  countCompletedTodos: number;
  selectedFilter: TodoStatus;
  onFilterSelect: (newFilter: TodoStatus) => void;
};

const filterOptions = Object.values(TodoStatus);

export const Filter: React.FC<Props> = React.memo(
  ({
    countActiveTodos,
    countCompletedTodos,
    selectedFilter,
    onFilterSelect,
  }) => {
    return (
      <footer className="todoapp__footer">
        <span className="todo-count">{`${countActiveTodos} items left`}</span>

        <nav className="filter">
          {filterOptions.map((option) => (
            <a
              key={option}
              href={`#/${option}`}
              className={classNames('filter__link', {
                selected: option === selectedFilter,
              })}
              onClick={() => onFilterSelect(option)}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </a>
          ))}
        </nav>

        {countCompletedTodos > 0 && (
          <button
            type="button"
            className={classNames('todoapp__clear-completed', {
              hidden: countCompletedTodos === 0,
            })}
          >
            Clear completed
          </button>
        )}
      </footer>
    );
  },
);
