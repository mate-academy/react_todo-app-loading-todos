import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserWarning } from './UserWarning';

import { USER_ID, getTodos } from './api/todos';
import { ActionType } from './types/ReducerTypes';

import { DispatchContext, StateContext } from './context/Store';

import { TodoList } from './components/TodoList';
import { Footer } from './components/TodoFooter';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    getTodos()
      .then(result => dispatch({ type: ActionType.SetTodos, payload: result }))
      .catch(() => {
        setErrorMessage('Unable to load todos');

        const timeoutRef = setTimeout(() => {
          setErrorMessage('');
        }, 3000);

        return () => {
          clearTimeout(timeoutRef);
        };
      });
  }, [dispatch]);

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
              ref={inputRef}
            />
          </form>
        </header>

        <TodoList />

        {todos.length !== 0 && <Footer />}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
