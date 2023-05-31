/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
// import { client } from './utils/fetchClient';
// import { Todo } from './types/Todo';
import { TodoApp } from './components/TodoApp';
import { TodosError } from './components/TodoErrors';
// import { useTodosContext } from './utils/TodosContext';

const USER_ID = 10529;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <TodoApp />
      <TodosError />
    </div>
  );
};
