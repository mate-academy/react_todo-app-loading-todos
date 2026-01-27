/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/todoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Filter>(Filter.ALL);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setError(null);
      })
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => setError(null), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const filteredTodos = todos.filter(todo => {
    if (status === Filter.ACTIVE) {
      return !todo.completed;
    }

    if (status === Filter.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  const countActiveTodo = todos.filter(element => !element.completed).length;

  const clearCompleted = () => {
    setTodos(current => current.filter(element => element.completed === false));
  };

  const handleStatusChange = (newStatus: Filter) => {
    setStatus(newStatus);
  };

  const clearError = () => {
    setError(null);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && <TodoList todos={filteredTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={filteredTodos}
            status={status}
            count={countActiveTodo}
            handleStatusChange={handleStatusChange}
            clearCompleted={clearCompleted}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error error={error} clearError={clearError} />
    </div>
  );
};
