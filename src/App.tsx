/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { USER_ID, getTodos } from './api/todos';
import { DispatchContext, StateContext } from './components/MainContext';
import { ActionTypes } from './types/ActionTypes';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const { errorMessage } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getTodos()
      .then(responce =>
        dispatch({
          type: ActionTypes.SetTodos,
          payload: responce,
        }),
      )
      .catch(() =>
        dispatch({
          type: ActionTypes.SetErrorMessage,
          payload: 'Unable to load todos',
        }),
      );
  }, [dispatch]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  // const handleSubmitTodo = (event: React.FormEvent) => {
  //   event.preventDefault();

  //   if (query.trim()) {
  //   }
  // };

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
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </form>
        </header>

        <TodoList />

        <TodoFilter />
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        // className="notification is-danger is-light has-text-weight-normal"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() =>
            dispatch({
              type: ActionTypes.SetErrorMessage,
              payload: '',
            })
          }
        />
        {/* show only one message at a time */}
        {errorMessage}
        {/* <br />
          Unable to load todos
          <br />
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
