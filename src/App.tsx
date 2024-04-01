/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import cn from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState<string>('All');
  const errorTimeout = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  let visibleTodos: Todo[] = [...todos];

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => errorTimeout('Unable to load todos'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  (function prepareVisibleTodos() {
    if (filterBy !== 'All') {
      visibleTodos = visibleTodos.filter(item => {
        switch (filterBy) {
          case 'Active':
            return !item.completed;
          case 'Completed':
            return item.completed;
          default:
            return item;
        }
      });
    }
  })();

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
        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
              isLoading={isLoading}
              setTodos={setTodos}
            />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.filter(item => !item.completed).length} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={cn('filter__link', {
                    selected: filterBy === 'All',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setFilterBy('All')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={cn('filter__link', {
                    selected: filterBy === 'Active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => setFilterBy('Active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={cn('filter__link', {
                    selected: filterBy === 'Completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilterBy('Completed')}
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
          </>
        )}

        {/* Hide the footer if there are no todos */}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: errorMessage === '' },
        )}
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
    </div>
  );
};
