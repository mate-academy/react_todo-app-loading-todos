/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './Components/UserWarning/UserWarning';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { ErrorMessage } from './Components/ErrorMessage';
import { Todo } from './types/Todo';
import { getActiveTodos, getCompletedTodos, getTodos } from './api/todos';
import { Errors } from './types/Errors';
import { Status } from './types/Status';

export const USER_ID = 11943;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

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

    switch(filterStatus) {
      case Status.All:
        getTodos(USER_ID)
          .then(setVisibleTodos)
          .catch(() => setError(Errors.LoadError));
        break;

      case Status.Active:
        getActiveTodos(USER_ID)
          .then(setVisibleTodos)
          .catch(() => setError(Errors.LoadError));
        break;

      case Status.Completed:
        getCompletedTodos(USER_ID)
          .then(setVisibleTodos)
          .catch(() => setError(Errors.LoadError));
        break;
    }
  }, [filterStatus])

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

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

      {error &&
        <ErrorMessage
          error={error}
          setError={setError}
        />}
    </div>
  );
};
