/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { Footer } from './Footer';
import { ErrorNotification } from './Error-not';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodo, setLoadingTodo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const loadAllTodos = () => {
    setLoadingTodo(true);
    setError(null);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => {
          setError(null);
        }, 3000);
      })
      .finally(() => setLoadingTodo(false));
  };

  useEffect(() => {
    loadAllTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      case Filter.All:
      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header setError={setError} />
        <TodoList
          filteredTodos={filteredTodos}
          loadingTodo={loadingTodo}
          setError={setError}
        />
        <Footer filter={filter} todos={todos} setFilter={setFilter} />
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
