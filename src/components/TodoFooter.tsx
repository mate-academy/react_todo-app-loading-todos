import { useContext } from 'react';
import { CreatedContext } from './TodoContext';
import { FilterButtons } from '../types/FilterType';
import React from 'react';

export const TodoFooter = () => {
  const { todos, setTodos, setFilterButton } = useContext(CreatedContext);
  const onlyActiveTodos = todos.filter(todo => !todo.completed);

  const handleCounter =
    todos.length === 1 ? '1 item left' : `${onlyActiveTodos.length} items left`;

  const handleClearButton = () => {
    const updateTodo = todos.filter(todo => !todo.completed);

    setTodos(updateTodo);
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <>
            <span className="todo-count" data-cy="TodosCounter">
              {handleCounter}
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
                onClick={() => setFilterButton(FilterButtons.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
                onClick={() => setFilterButton(FilterButtons.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterButton(FilterButtons.Completed)}
              >
                Completed
              </a>
            </nav>
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleClearButton}
            >
              Clear completed
            </button>
          </>
        </footer>
      )}
    </>
  );
};
