/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

import { USER_ID } from './utils/user';

import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoErrorMessage } from './components/TodoErrorMessage';
import { UseTodosContext } from './utils/TodosContext';

export const App: React.FC = () => {
  const context = UseTodosContext();

  const {
    todos,
    isAllCompleted,
    setIsAllCompleted,
  } = context;

  const currentCompletionStatus = todos.every(({ completed }) => completed);

  const changeAllTodosStatus = () => {
    if (isAllCompleted || currentCompletionStatus) {
      setIsAllCompleted(false);

      return;
    }

    setIsAllCompleted(true);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {Boolean(todos.length) && (
            <button
              onClick={changeAllTodosStatus}
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: currentCompletionStatus,
              })}
            />
          )}

          <TodoForm />
        </header>

        {Boolean(todos.length) && (
          <>
            <TodoList />

            <TodoFooter />
          </>
        )}

      </div>

      <TodoErrorMessage />
    </div>
  );
};
