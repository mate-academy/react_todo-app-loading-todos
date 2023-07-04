/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { ErrorMessage } from './components/ErrorMessage';
import { StatusFilterType } from './types/StatusFilterType';
import { StatusFilter } from './components/StatusFilter';

const USER_ID = 10897;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState(StatusFilterType.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError('Loading todos failed'));
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

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case StatusFilterType.COMPLETED:
        return completedTodos;

      case StatusFilterType.ACTIVE:
        return activeTodos;

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
        <Header />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos.length} items left`}
            </span>

            <StatusFilter filter={filter} onChangeFilter={setFilter} />

            {completedTodos && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <ErrorMessage error={error} onCloseError={handleCloseError} />
    </div>
  );
};
