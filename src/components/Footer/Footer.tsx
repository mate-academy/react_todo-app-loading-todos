import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  currentFilter: FilterBy;
  setCurrentFilter: Dispatch<SetStateAction<FilterBy>>;
};

export const Footer: React.FC<Props> = ({
  currentFilter,
  setCurrentFilter,
  todos,
  setTodos,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterBy).map(filter => (
          <a
            key={filter}
            href={`#/${filter.toLowerCase()}`}
            data-cy={`FilterLink${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
            className={classNames('filter__link', {
              selected: currentFilter === filter,
            })}
            onClick={() => {
              setCurrentFilter(filter);
            }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
