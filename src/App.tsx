/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Error } from './components/Error';
import { Filters } from './types/Filters';
import { Filter } from './components/Filter';

const USER_ID = 10892;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState(Filters.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer) => setTodos(todosFromServer))
      .catch(() => setError('Error: unable to load todos'));
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filters.COMPLETED:
        return completedTodos;

      case Filters.ACTIVE:
        return uncompletedTodos;

      default:
        return todos;
    }
  }, [todos, filter]);

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <TodoForm />
        </header>

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${uncompletedTodos.length} items left`}
            </span>

            <Filter filter={filter} onChangeFilter={setFilter} />

            {completedTodos && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <Error error={error} onCloseError={handleCloseError} />
    </div>
  );
};
