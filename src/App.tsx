/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { USER_ID, getTodos } from './api/todos';
import { TodoComponent } from './components/TodoComponent/TodoComponent';
import { Filter } from './types/Filter';

function prepareTodos(todos: Todo[], filter: Filter): Todo[] {
  let todosCopy = [...todos];

  if (filter === Filter.Active) {
    todosCopy = todosCopy.filter(todo => todo.completed === false);
  }

  if (filter === Filter.Completed) {
    todosCopy = todosCopy.filter(todo => todo.completed === true);
  }

  return todosCopy;
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[] | null>(null);
  const [filter, setFilter] = useState(Filter.All);

  const [preparedTodos, setPreparedTodos] = useState<Todo[] | null>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [hideError, setHideError] = useState(true);

  function setErrorHide():void {
    if (!hideError) {
      setHideError(true);
    }
  }

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosServer) => {
        setTodosFromServer(todosServer);
        setPreparedTodos(prepareTodos(todosServer, filter));
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setHideError(false);
      });
  }, [filter]);

  useEffect(() => {
    const timerId = setTimeout(setErrorHide, 3000);

    return () => clearTimeout(timerId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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

        {todosFromServer && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {preparedTodos?.map(todo => (
                <TodoComponent todo={todo} key={todo.id} />
              ))}
            </section>

            {/* Hide the footer if there are no todos */}
            {todosFromServer.length > 0 && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {`${todosFromServer.filter(t => !t.completed).length} items left`}
                </span>

                {/* Active filter should have a 'selected' class */}
                <nav className="filter" data-cy="Filter">
                  <a
                    href="#/"
                    className={classNames('filter__link', {
                      selected: filter === Filter.All,
                    })}
                    data-cy="FilterLinkAll"
                    onClick={() => setFilter(Filter.All)}
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    className={classNames('filter__link', {
                      selected: filter === Filter.Active,
                    })}
                    data-cy="FilterLinkActive"
                    onClick={() => setFilter(Filter.Active)}
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    className={classNames('filter__link', {
                      selected: filter === Filter.Completed,
                    })}
                    data-cy="FilterLinkCompleted"
                    onClick={() => setFilter(Filter.Completed)}
                  >
                    Completed
                  </a>
                </nav>

                {/* don't show this button if there are no completed todos */}
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              </footer>
            )}
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {true && (
        <div
          data-cy="ErrorNotification"
          className={classNames(
            'notification', 'is-danger', 'is-light', 'has-text-weight-normal',
            {
              hidden: hideError,
            },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={setErrorHide}
          />
          { /* show only one message at a time
            Unable to load todos
            <br />
            Title should not be empty
            <br />
            Unable to add a todo
            <br />
            Unable to delete a todo
            <br /> */}
          {errorMessage}
        </div>
      )}
    </div>
  );
};
