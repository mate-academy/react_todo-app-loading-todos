/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { SortByStatus } from './types/SortByStatus';
import { NotificationError } from
  './components/NotificationError/NotificationError';
import { TodoList } from './components/TodoList/TodoList';

const USER_ID = 11196;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortByStatus>(SortByStatus.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setHasError('Unable to load a todo');
      });
  }, []);

  const handleCloseError = () => {
    setHasError(null);
  };

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const visibleTodos = useMemo(() => todos.filter((todo) => {
    switch (sortBy) {
      case SortByStatus.Active:
        return !todo.completed;
      case SortByStatus.Completed:
        return todo.completed;
      default:
        return todo;
    }
  }), [todos, sortBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todosLength={visibleTodos.length} />

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {(visibleTodos.length > 0) && (
          <Footer
            sortBy={sortBy}
            numberActiveTodos={activeTodos}
            onChangeSortBy={setSortBy}
            hasCompletedTodo={visibleTodos.length > 0}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasError
        && (
          <NotificationError
            error={hasError}
            setError={setHasError}
            onCloseError={handleCloseError}
          />
        )}
    </div>
  );
};
