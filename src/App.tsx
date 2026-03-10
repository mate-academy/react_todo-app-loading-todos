import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import TodoList from './components/TodoList';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoList />
      </div>
    </div>
  );
};
