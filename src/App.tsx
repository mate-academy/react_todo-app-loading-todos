/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { Error } from './types/Error';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 11941;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.All);
  const [error, setError] = useState<Error | null>(null);

  function loadTodos() {
    setError(null);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(Error.LoadError));
  }

  useEffect(loadTodos, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      case Status.All:
      default:
        return todos;
    }
  }, [filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">

        <TodoHeader />

        {!!todos.length && <TodoList todos={filteredTodos} />}

        {!!todos.length
        && (
          <TodoFooter
            todos={todos}
            filter={filter}
            setFilter={setFilter}
          />
        )}

      </div>

      <ErrorNotification
        error={error}
        setError={setError}
      />

    </div>
  );
};
