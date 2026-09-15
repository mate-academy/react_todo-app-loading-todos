import React from 'react';
import { Filter } from '../../types/Filter';
import './Footer.scss';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  onFilter: (filter: Filter) => void;
  currentFilter: Filter;
  activeCount: number;
  doesCompletedExist: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Footer: React.FC<Props> = React.memo(function Footer({
  onFilter,
  currentFilter,
  activeCount,
  doesCompletedExist,
  setTodos,
}) {
  const filters: Filter[] = ['All', 'Active', 'Completed'];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {filters.map(filter => (
          <button
            className={classNames('filter__link', {
              selected: currentFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => onFilter(filter)}
            key={filter}
          >
            {filter}
          </button>
        ))}
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
        }}
        disabled={!doesCompletedExist}
      >
        Clear completed
      </button>
    </footer>
  );
});
