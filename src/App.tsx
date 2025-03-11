/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos, addTodo, deleteTodo, updateTodo } from './api/todos';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import Header from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();

      setTodos(data);
      setError(null);
    } catch {
      setError('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      setError('Title should not be empty');

      return;
    }

    try {
      setLoading(true);
      const createdTodo = await addTodo(newTodo);

      setTodos([...todos, createdTodo]);
      setNewTodo('');
      setError(null);
    } catch {
      setError('Unable to add a todo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      setTodos(
        todos.map(todo =>
          todo.id === todoId ? { ...todo, isLoading: true } : todo,
        ),
      );
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
      setError(null);
    } catch {
      setError('Unable to delete a todo');
      setTodos(
        todos.map(todo =>
          todo.id === todoId ? { ...todo, isLoading: false } : todo,
        ),
      );
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      setTodos(
        todos.map(t => (t.id === todo.id ? { ...t, isLoading: true } : t)),
      );
      const updatedTodo = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t)));
      setError(null);
    } catch {
      setError('Unable to update a todo');
      setTodos(
        todos.map(t => (t.id === todo.id ? { ...t, isLoading: false } : t)),
      );
    }
  };

  const filteredTodos = () => {
    switch (activeFilter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleAddTodo={handleAddTodo}
          todos={todos}
          handleToggleTodo={handleToggleTodo}
          loading={loading}
        />
        <TodoList
          todos={filteredTodos()}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
        />
        <Footer
          todos={todos}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          handleClearCompleted={handleClearCompleted}
        />
      </div>
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger ${error === null ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error || ''}
      </div>
    </div>
  );
};
