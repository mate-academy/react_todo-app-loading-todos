/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, TodoStatusFilter } from './types/Todo';
import { TodoError } from './components/TodoError';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState(TodoStatusFilter.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [error]);

  const filteredTodos = useMemo(() => {
    switch (selectedStatus) {
      case TodoStatusFilter.Active:
        return todos.filter(todo => !todo.completed);
      case TodoStatusFilter.Completed:
        return todos.filter(todo => todo.completed);
      case TodoStatusFilter.All:
      default:
        return todos;
    }
  }, [todos, selectedStatus]);

  const handleSelectStatus = (status: TodoStatusFilter) => {
    setSelectedStatus(status);
  };

  const handleErrorClose = () => {
    setError(null);
  };

  const hasCompletedTodos = todos.some(todo => todo.completed);
  const hasTodos = todos.length > 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {hasTodos && (
          <Footer
            todos={todos}
            hasCompletedTodos={hasCompletedTodos}
            selectedStatus={selectedStatus}
            handleSelectStatus={handleSelectStatus}
          />
        )}
      </div>

      <TodoError message={error} onClose={handleErrorClose} />
    </div>
  );
};
