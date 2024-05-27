/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { ToDoProvider } from './components/TodoContext';
import { TodoFooter } from './components/TodoFooter';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const [error, setError] = useState<string>('');

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <ToDoProvider>
          <TodoHeader />
          <TodoList />
          <TodoFooter />
        </ToDoProvider>
      </div>
      <Error error={error} setError={setError} />

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
    </div>
  );
};
