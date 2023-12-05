/* eslint-disable jsx-a11y/control-has-associated-label */

import { useContext, useEffect } from 'react';
import cn from 'classnames';

import { TodoList } from './TodoList';
import { DispatchContext, StateContext } from './TodosProvider';
import { Footer } from './Footer';
import { ErrorMessage } from '../types/ErrorMessage';

export const TodoApp = () => {
  const { todos, errorMessage } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const closeErrorMessage = () => {
    dispatch({ type: 'error', payload: ErrorMessage.None });
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => dispatch(
        { type: 'error', payload: ErrorMessage.None },
      ), 3000);
    }
  }, [errorMessage, dispatch]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!!todos.length && (
          <>
            <TodoList />
            <Footer />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeErrorMessage}
        />
        {errorMessage}
      </div>
    </div>
  );
};
