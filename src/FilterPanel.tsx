import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from './types/Todo';

interface FilterPanelProps {
  setFilterMode: React.Dispatch<React.SetStateAction<string>>,
  filteredTodos: Todo[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  setFilterMode, filteredTodos,
}) => {
  const [activeButton, setActiveButton] = useState<string>('All');

  const hasCompletedTasks = filteredTodos.some((todo) => todo.completed);

  const showActiveTodos = (filterName: string) => {
    setFilterMode('Active');
    setActiveButton(filterName);
  };

  const showAllTodos = (filterName: string) => {
    setFilterMode('All');
    setActiveButton(filterName);
  };

  const showCompletedTodos = (filterName: string) => {
    setFilterMode('Completed');
    setActiveButton(filterName);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: activeButton === 'All',
          })}
          onClick={() => showAllTodos('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: activeButton === 'Active',
          })}
          onClick={() => showActiveTodos('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: activeButton === 'Completed',
          })}
          onClick={() => showCompletedTodos('Completed')}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      {hasCompletedTasks && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
