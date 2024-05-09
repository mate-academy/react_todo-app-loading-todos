/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, filterByStatus } from './api/todos';
import { typeTodo } from './types/Todo';
import { Todo } from './components/Todo/Todo';
import { Loader } from './components/Loader/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [todos, setTodos] = useState<typeTodo[]>([]);

  const filterStatus = (filter: string) => {
    let status: string | boolean = '';

    setFilterType(filter);

    if (filter === 'all') {
      status = 'all';
    } else if (filter === 'active') {
      status = false;
    } else {
      status = true;
    }

    setIsLoading(true);
    filterByStatus(status)
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    filterStatus('all');
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {isLoading
            ? <Loader />
            : (
              todos.map(todo => (
                <Todo key={todo.id} todo={todo} />
              ))
            )
          }
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${
                'all' === filterType ? 'selected' : ''
              }`}
              data-cy="FilterLinkAll"
              onClick={() => filterStatus('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${
                'active' === filterType ? 'selected' : ''
              }`}
              data-cy="FilterLinkActive"
              onClick={() => filterStatus('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${
                'completed' === filterType ? 'selected' : ''
              }`}
              data-cy="FilterLinkCompleted"
              onClick={() => filterStatus('completed')}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button data-cy="HideErrorButton" type="button" className="delete" />
          {/* show only one message at a time */}
          {errorMessage}
          {/* <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
        </div>
      )}
    </div>
  );
};
