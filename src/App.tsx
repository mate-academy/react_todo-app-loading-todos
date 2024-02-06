/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoAppFooter } from './components/TodoAppFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { TodosContext } from './providers/TodosProvider';
import { USER_ID } from './utils/constants';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [status, setStatus] = useState(Status.All);

  const filteredTodos = todos.filter((todo) => {
    if (status === Status.Active) {
      return !todo.completed;
    }

    if (status === Status.Completed) {
      return todo.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader />

        <TodoList
          todos={filteredTodos}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <TodoAppFooter
            status={status}
            onStatusChange={setStatus}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification />
    </div>
  );
};
