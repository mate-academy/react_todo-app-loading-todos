/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { addTodo, deleteTodo, getTodos, patchTodo, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { CreateForm } from './components/CreateForm';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todosForView, setTodosForView] = useState<Todo[]>([]);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  //const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState('All');

  const [errorMessage, setErrorMessage] = useState('');

  const setFilterValue = useCallback(setFilterBy, [filterBy]);
  const [hidenError, setHidenError] = useState(true);

  useEffect(() => {
    if (!errorMessage) {
      setTimeout(() => setHidenError(true), 3000);
    } else {
      setHidenError(false);
    }
  }, [errorMessage]);

  useEffect(() => {
    //setLoading(true);
    getTodos(USER_ID)
      .then(response => {
        setTodosFromServer(response);
      })
      .catch(() => setErrorMessage('Unable to load todos'));
    //.finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCompletedTodos(() => todosFromServer.filter(item => item.completed));
    setTodosForView(todosFromServer);
  }, [todosFromServer]);

  useEffect(() => {
    if (filterBy === 'Completed') {
      setTodosForView(completedTodos);

      return;
    }

    if (filterBy === 'Active') {
      setTodosForView(todosFromServer.filter(item => !item.completed));

      return;
    }

    setTodosForView(todosFromServer);
  }, [todosForView, filterBy]);

  const onClearCompleted = () => {
    completedTodos.forEach(item => deleteTodo(item.id));
    setTodosFromServer(currentList =>
      currentList.filter(item => !item.completed),
    );
  };

  const resetAllTodosToActive = () => {
    setTodosFromServer(current =>
      current.map(item => {
        const newTodo = { ...item, completed: false };

        patchTodo(newTodo);

        return newTodo;
      }),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: completedTodos.length === todosFromServer.length,
            })}
            data-cy="ToggleAllButton"
            onClick={resetAllTodosToActive}
          />

          <CreateForm
            onAdd={addTodo}
            updateTodos={setTodosFromServer}
            setError={setErrorMessage}
          />
        </header>

        <TodoList
          todos={todosForView}
          updateTodos={setTodosFromServer}
          setError={setErrorMessage}
        />

        {/* Hide the footer if there are no todos */}
        {todosFromServer.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosFromServer.length - completedTodos.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav
              className="filter"
              data-cy="Filter"
              onClick={event =>
                setFilterValue((event.target as HTMLAnchorElement).innerText)
              }
            >
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterBy === 'All',
                })}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterBy === 'Active',
                })}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterBy === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={onClearCompleted}
              disabled={completedTodos.length === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: hidenError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
