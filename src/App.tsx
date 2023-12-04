/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodosFilter } from './components/TodosFilter';
import { ToogleButton } from './components/ToogleButton';
import { TodoForm } from './components/TodoForm';
import { TodosList } from './components/TodosList';
import { Error } from './types/Error';
import { ErrorNotifications } from './components/ErrorNotifications';

const USER_ID = 11955;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [errorType, setErrorType] = useState<Error | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
        setVisibleTodos(response);
      })
      .catch((error) => {
        setErrorType(Error.Load);
        throw error;
      });
  }, []);

  const areAllActiveTodos = todos.some(todo => !todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <ToogleButton areAllActiveTodos={areAllActiveTodos} />

          <TodoForm />
        </header>

        <TodosList visibleTodos={visibleTodos} />

        {!!todos.length && (
          <TodosFilter
            todos={todos}
            setVisibleTodos={setVisibleTodos}
            areAllActiveTodos={areAllActiveTodos}
            setErrorType={setErrorType}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorType && (
        <ErrorNotifications errorType={errorType} setErrorType={setErrorType} />
      )}
    </div>
  );
};
