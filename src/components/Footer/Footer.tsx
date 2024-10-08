import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';
import classNames from 'classnames';

type FooterType = {
  todos: Todo[];
  setTodos: (newTodo: Todo[]) => void;
  setCurrentFilter: (filter: FilterType) => void;
};

export const Footer: React.FC<FooterType> = ({
  todos,
  setTodos,
  setCurrentFilter,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(FilterType.All);

  const TodoCount = todos.filter(todo => todo.completed === false).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const handleFilterChange = (filterType: FilterType) => {
    setActiveFilter(filterType);
    setCurrentFilter(filterType);
  };

  return (
    // {/* Hide the footer if there are no todos */}
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {TodoCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: activeFilter === FilterType.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterChange(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: activeFilter === FilterType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterChange(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: activeFilter === FilterType.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterChange(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={() => setTodos(todos.filter(todo => todo.completed === false))}
      >
        Clear completed
      </button>
    </footer>
  );
};
