// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import * as client from './api/todos';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';

import { TodoList } from './components/TodoList/TodoList';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoShowError } from './components/TodoShowError/TodoShowError';

export const App: React.FC = () => {
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  const [error, setError] = useState<string>('');
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const [query, setQuery] = useState<string>('');
  const [currentFilter, setCurrentFilter] = useState<Filters>(Filters.ALL);

  useEffect(() => {
    client
      .getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const filteredTodos = useMemo(() => {
    if (!todos) {
      return [];
    }

    return todos.filter(todo => {
      switch (currentFilter) {
        case Filters.ACTIVE:
          return !todo.completed;

        case Filters.COMPLETED:
          return todo.completed;

        case Filters.ALL:
        default:
          return true;
      }
    });
  }, [todos, currentFilter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          query={query}
          setQuery={setQuery}
          setTodos={setTodos}
          setError={setError}
        />

        {todos && todos.length > 0 && (
          <TodoList
            filteredTodos={filteredTodos}
            setTodos={setTodos}
            setError={setError}
          />
        )}

        {/* Hide the footer if there are no todos */}
        {todos && todos.length > 0 && (
          <TodoFooter
            todos={todos}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <TodoShowError error={error} setError={setError} />
    </div>
  );
};
