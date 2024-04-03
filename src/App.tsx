/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { TodoMain } from './components/TodoMain';
import { TodoFooter } from './components/TodoFooter';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { ErrorStatus } from './types/ErrorsStatus';
import { ErrorNotification } from './components/ErrorNotification';
import { wait } from './utils/fetchClient';
import { getVisibleTodos } from './utils/getVisibleTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<FilterStatus>(FilterStatus.ALL);
  const [errorMessage, setErrorMessage] = useState<ErrorStatus>(
    ErrorStatus.NoError,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorStatus.LoadError);
        wait(3000).then(() => {
          setErrorMessage(ErrorStatus.NoError);
        });
      });
  }, []);

  const visibleTodos = getVisibleTodos(todos, status);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        {visibleTodos.map(todo => (
          <TodoMain key={todo.id} todo={todo} />
        ))}
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <TodoFooter status={status} todos={todos} setStatus={setStatus} />
        )}
      </div>
      <ErrorNotification
        errorMassage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
    </div>
  );
};
