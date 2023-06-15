import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from './types/Todo';

interface FilterPanelProps {
  setFilterMode: React.Dispatch<React.SetStateAction<string>>,
  filteredTodos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  setFilterMode, filteredTodos, setFilteredTodos,
}) => {
  const [activeButton, setActiveButton] = useState<string>('All');

  const hasCompletedTasks = filteredTodos.some((todo) => todo.completed);
  const leftTodoCounter = filteredTodos.reduce((counter, todo) => {
    if (!todo.completed) {
      // eslint-disable-next-line no-param-reassign
      counter += 1;
    }

    return counter;
  }, 0);

  const leftTodosText = (leftTodoCounter === 1) ? '1 item left' : `${leftTodoCounter} items left`;

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

  const clearCompletedTodos = () => {
    const activeTodos = filteredTodos.filter((todo) => !todo.completed);

    setFilteredTodos(activeTodos);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {leftTodosText}
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
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={clearCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
