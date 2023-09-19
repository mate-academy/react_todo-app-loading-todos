/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoError } from './components/TodoError/TodoError';
import {
  USER_ID,
} from './components/TodosContextProvider/TodosContextProvider';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoApp />

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <TodoError />
    </div>
  );
};
