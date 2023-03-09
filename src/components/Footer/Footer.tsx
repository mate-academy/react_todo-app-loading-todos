import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../../enums/TodoStatus';

type Props = {
  activeTodosQuantity: number;
  selectedFilter: TodoStatus;
  onFilterSelect: (newFilter: TodoStatus) => void;
};

const filterOptions = Object.values(TodoStatus);

export const Footer: React.FC<Props> = React.memo(
  ({
    activeTodosQuantity,
    selectedFilter,
    onFilterSelect,
  }) => {
    return (
      <footer className="todoapp__footer">
        <span className="todo-count">{`${activeTodosQuantity} items left`}</span>

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
              {option}
            </a>
          ))}
        </nav>

        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>
    );
  },
);
