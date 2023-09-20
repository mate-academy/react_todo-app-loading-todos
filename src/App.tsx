/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { TodoApp } from './components/TodoApp';
import { ContextProvider } from './TodosContext';

const USER_ID = 11443;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <ContextProvider>
      <TodoApp userID={USER_ID} />
    </ContextProvider>
  );
};
