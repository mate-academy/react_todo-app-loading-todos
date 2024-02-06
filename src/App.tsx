import React from 'react';
import { USER_ID } from './components/Context/StateContext';
import { TodoApp } from './components/TodoApp/TodoApp';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodoApp />
  );
};
