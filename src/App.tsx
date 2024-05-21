import React from 'react';

import { TodoApp } from './components/TodoApp';
import { UserWarning } from './components/UserWarning/UserWarning';
import { TodosProvider } from './TodosProvider';
import { USER_ID } from './api/todos';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
