import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoApp } from './components/todoApp';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return <TodoApp />;
};
