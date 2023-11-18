/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './Components/UserWarning/UserWarning';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { ErrorMessage } from './Components/ErrorMessage';
import { Todo } from './types/Todo';
import { getTodos, getTodosByStatus } from './api/todos';
import { Errors } from './types/Errors';
import { Status } from './types/Status';
import { Header } from './Components/Header';
import { USER_ID } from './utils/userId';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [editedTodo] = useState<Todo | null>(null);
  const [updateProcessing] = useState(false);
  const [error, setError] = useState<Errors | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(Errors.LoadError));

    switch (filterStatus) {
      case Status.All:
        getTodos(USER_ID)
          .then(setVisibleTodos)
          .catch(() => setError(Errors.LoadError));
        break;

      case Status.Active:
        getTodosByStatus(USER_ID, false)
          .then(setVisibleTodos)
          .catch(() => setError(Errors.LoadError));
        break;

      case Status.Completed:
        getTodosByStatus(USER_ID, true)
          .then(setVisibleTodos)
          .catch(() => setError(Errors.LoadError));
        break;

      default:
        break;
    }
  }, [filterStatus]);

  return USER_ID ? (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header setError={setError} />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
              edited={editedTodo}
              updateProcessing={updateProcessing}
            />

            <Footer
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              setError={setError}
            />
          </>
        )}
      </div>

      {error
        && (
          <ErrorMessage
            error={error}
            setError={setError}
          />
        )}
    </div>
  ) : <UserWarning />;
};
