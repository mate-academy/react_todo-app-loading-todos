/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { TodoApp, USER_ID } from './components/TodoApp/TodoApp';
import {
  TodosContextProvider,
} from './components/TodosContextProvider/TodosContextProvider';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodosContextProvider>
      <TodoApp />
    </TodosContextProvider>
  );
};
