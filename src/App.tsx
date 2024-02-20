/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api/todos';
import { wait } from './utils/fetchClient';
import { getFilteredTodos } from './services/getFilteredTodos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

const USER_ID = 149;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState('');
  const filteredTodos = getFilteredTodos(todos, status);

  const completedItems = todos.filter(({ completed }) => {
    return !completed;
  }).length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Error reading list todos');

        wait(3000).then(() => setErrorMessage(''));
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && (
          <>
            <TodoList filteredTodos={filteredTodos} />

            <TodoFooter
              status={status}
              setStatus={setStatus}
              completed={completedItems}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
