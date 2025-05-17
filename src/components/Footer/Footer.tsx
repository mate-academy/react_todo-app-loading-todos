import React from 'react';
import classNames from 'classnames';
import { Filter } from '../../App';

type Props = {
  activeTodos: number;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<Filter>>;
  completedTodos: number;
};

export const Footer: React.FC<Props> = ({
  selectedFilter,
  activeTodos,
  setSelectedFilter,
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map((filter: Filter, index) => {
          return (
            <a
              href={`#/${filter}`}
              key={index}
              className={classNames('filter__link', {
                selected: selectedFilter === filter,
              })}
              data-cy={`FilterLink${filter}`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
