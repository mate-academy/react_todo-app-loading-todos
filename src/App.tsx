/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoApp } from './components/TodoApp';
import { TodosContextProvider } from './context/TodosContext';

export const App: React.FC = () => {
  return USER_ID ? (
    <TodosContextProvider>
      <TodoApp />
    </TodosContextProvider>
  ) : (
    <UserWarning />
  );
};
