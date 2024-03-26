import React from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { useTodos } from './utils/TodoContext';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

export const App: React.FC = () => {
  const { todos, isLoading, error } = useTodos();
  const isTodos = todos.length > 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {!isLoading && !error && isTodos && <TodoList />}

        {!isLoading && !error && isTodos && <TodoFooter />}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {error?.message}
      </div>
    </div>
  );
};
