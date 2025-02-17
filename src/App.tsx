import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './components/UserWarning';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';

import { USER_ID, getTodos } from './api/todos';

import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setfilterBy] = useState<FilterBy>(FilterBy.All);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.Active:
          return !todo.completed;
        case FilterBy.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [filterBy, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />
        {!!todos.length && (
          <Footer
            onGetFilterBy={setfilterBy}
            filterBy={filterBy}
            todos={todos}
          />
        )}
      </div>
      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
