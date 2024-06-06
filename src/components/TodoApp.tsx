import React from 'react';

import { TodoHeader } from './TodoHeader';
import { TodoMain } from './TodoMain';
import { TodoFooter } from './TodoFooter';
import { UserWarning } from '../UserWarning';
import { TodoError } from './TodoError';
import { USER_ID } from '../api/todos';

export const TodoApp: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader />
        <TodoMain />
        <TodoFooter />
        <TodoError />
      </div>
    </div>
  );
};
