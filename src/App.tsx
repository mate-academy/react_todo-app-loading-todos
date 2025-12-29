/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [error, setError] = useState('');

  // -------- helpers --------
  const showMessage = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  // -------- effects --------
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => showMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  // -------- derived data --------
  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const hasTodos = todos.length > 0;

  // -------- handlers --------
  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.random(),
      userId: USER_ID,
      title,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const handleToggleAll = () => {
    const allCompleted =
      todos.length > 0 && todos.every(todo => todo.completed);

    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  };

  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const handleCloseError = () => {
    setError('');
  };

  // -------- render --------
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          onAddTodo={handleAddTodo}
          onToggleAll={handleToggleAll}
        />

        <section className="todoapp__main" data-cy="TodoList">
          {hasTodos && <TodoList todos={visibleTodos} />}
        </section>

        <Footer
          activeTodos={activeTodos}
          completedTodos={hasCompletedTodos}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={handleClearCompleted}
        />
      </div>

      <Notification message={error} onClose={handleCloseError} />
    </div>
  );
};
