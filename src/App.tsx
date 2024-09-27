/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import TodoInput from './components/TodoInput/TodoInput';
import { TodoList } from './components/TodoList/TodoList';
import { useTodos } from './hooks/useTodos';
import TodoFooter from './components/TodoFooter/TodoFooter';
import ErrorNotification from './components/ErrorNotificatio/ErrorNotification';

export const App: React.FC = () => {
  const { todos } = useTodos();

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoInput />

        <TodoList />

        {todos.length > 0 && <TodoFooter />}
      </div>

      <ErrorNotification />
    </div>
  );
};
