/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoNotification } from './components/TodoNotification';
import { getTodos, filterTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

const USER_ID = 6657;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => setTodos(response))
      .catch(() => setError(true));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos && (
          <>
            <TodoList todos={filterTodos(todos, filter)} />
            <Footer todos={todos} setFilter={setFilter} filter={filter} />
          </>
        )}
      </div>

      {error && (
        <TodoNotification setError={setError} />
      )}
    </div>
  );
};
