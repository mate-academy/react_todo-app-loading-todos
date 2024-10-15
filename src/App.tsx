import React from 'react';

import { USER_ID } from './api/todos';
import { UserWarning } from './components/UserWarning';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return <TodoApp />;
};
