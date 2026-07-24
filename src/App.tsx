import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessage } from './constants/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');

  const hasTodos = todos.length > 0;
  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const allCompleted = todos.every(todo => todo.completed);

  const visibleTodos = () => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  };

  useEffect(() => {
    setError('');

    getTodos()
      .then(result => {
        setTodos(result);
      })
      .catch(() => {
        setError(ErrorMessage.Load);
      });
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasTodos={hasTodos} allCompleted={allCompleted} />

        {hasTodos && <TodoList todos={visibleTodos()} />}

        {/* Hide the footer if there are no todos */}
        {hasTodos && (
          <Footer
            itemsLeft={itemsLeft}
            hasCompletedTodos={hasCompletedTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
