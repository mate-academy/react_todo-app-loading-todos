import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { ErrorMessage } from './types/ErrorMessage';
import { Header, TodoList, Footer, ErrorNotification } from './components';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.All);
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.None);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError(ErrorMessage.Load));
  }, []);

  useEffect(() => {
    if (!error) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setError(ErrorMessage.None);
    }, 3000);

    return () => window.clearTimeout(timerId);
  }, [error]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer todos={todos} filter={filter} onFilterChange={setFilter} />
          </>
        )}
      </div>

      <ErrorNotification
        error={error}
        onClose={() => setError(ErrorMessage.None)}
      />
    </div>
  );
};
