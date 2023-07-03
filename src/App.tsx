/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { filterTodos } from './helpers/FilterTodos';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 10926;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(result => {
        setTodosFromServer(result);
      })
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (error) {
      timerId = setTimeout(() => setError(null), 3000);
    }

    return () => clearTimeout(timerId);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = filter !== Filters.All
    ? filterTodos(todosFromServer, filter)
    : todosFromServer;
  const isAnyCompletedTodo = todosFromServer.some(todo => todo.completed);
  const todosCount = todosFromServer.length;

  const handleFilterChange = (newFilter: Filters) => {
    setFilter(newFilter);
  };

  todosFromServer.filter(todo => todo.completed || !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          <TodoList
            todos={visibleTodos}
          />
        </section>

        {visibleTodos.length > 0 && (
          <Footer
            isAnyCompleted={isAnyCompletedTodo}
            todosCount={todosCount}
            onFilterChange={handleFilterChange}
            selectedFilter={filter}
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
