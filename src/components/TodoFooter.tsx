import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from './Todos-Context';
import { Status } from './TodosFilter';

export const TodoFooter: React.FC = () => {
  const { setFiltred, todos, setTodos, filtred } = useContext(TodosContext);
  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const findCompleted = todos.some(todo => todo.completed);

  const filterByStatus = (status: Status) => {
    setFiltred(status);
  };

  const handleClear = () => {
    setTodos(uncompletedTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${uncompletedTodos.length} ${uncompletedTodos.length === 1 ? 'item' : 'items'} left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filtred === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => filterByStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filtred === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => filterByStatus(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filtred === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => filterByStatus(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClear}
        disabled={!findCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
