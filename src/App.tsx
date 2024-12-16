/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo, Filters } from './types/Todo';
import TodoItem from './components/TodoItem';
import { filterTodos } from './utils/service';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorMessage from './components/ErrorMessage';
import React from 'react';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<Filters>(Filters.All);
  const [todos, setTodos] = useState<Todo[]>([]);

  const filtered = useMemo(
    () => filterTodos(todos, activeFilter),
    [todos, activeFilter],
  );

  const loadTodos = useCallback(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(''), 3000);
    }
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <section className="todoapp__main" data-cy="TodoList">
          {filtered.map(todo => (
            <TodoItem key={todo.id} todo={todo} isLoading={isLoading} />
          ))}
        </section>

        {todos.length > 0 && (
          <Footer
            todos={todos}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
