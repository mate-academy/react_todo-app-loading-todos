/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  createTodo,
  getTodos,
  removeTodo,
  toggleAllTodosStatus,
  toggleTodoStatus,
} from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState<
    Record<string | number, boolean>
  >({});
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const errorTimerRef = useRef(0);

  const showError = (message: string) => {
    setError(message);

    if (errorTimerRef.current) {
      window.clearTimeout(errorTimerRef.current);
      errorTimerRef.current = window.setTimeout(() => setError(''), 3000);
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch {
        showError('Unable to load todos');
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    errorTimerRef.current = window.setTimeout(() => setError(''), 3000);

    return () => window.clearTimeout(errorTimerRef.current);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const addTodo = (title: string) => {
    if (!title.trim()) {
      showError('Title should not be empty');

      return;
    }

    const tempId = -Date.now();
    const tempTodo: Todo = {
      id: tempId,
      userId: USER_ID,
      title,
      completed: false,
    };

    setTodos(prev => [tempTodo, ...prev]);
    setLoadingTodos(prev => ({ ...prev, [tempId]: true }));
    setNewTodoTitle('');

    createTodo(title)
      .then(newTodo => {
        setTodos(prev => prev.map(t => (t.id === tempId ? newTodo : t)));
      })
      .catch(() => {
        showError('Unable to add todo');
        setTodos(prev => prev.filter(t => t.id !== tempId));
      })
      .finally(() => setLoadingTodos(prev => ({ ...prev, [tempId]: false })));
  };

  const toggleTodo = (id: number) => {
    setLoadingTodos(prev => ({ ...prev, [id]: true }));
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    toggleTodoStatus(id, !todo.completed)
      .then(updatedTodo => {
        setTodos(prev => prev.map(t => (t.id === id ? updatedTodo : t)));
        setError('');
      })
      .catch(() => showError('Unable to update todo'))
      .finally(() => setLoadingTodos(prev => ({ ...prev, [id]: false })));
  };

  const toggleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const ids = todos.map(t => t.id);

    setLoadingTodos(ids.reduce((acc, id) => ({ ...acc, [id]: true }), {}));

    toggleAllTodosStatus(todos, !allCompleted)
      .then(updatedTodos => setTodos(updatedTodos))
      .catch(() => showError('Unable to update todos'))
      .finally(() => setLoadingTodos({}));
  };

  const deleteTodo = (id: number) => {
    setLoadingTodos(prev => ({ ...prev, [id]: true }));

    removeTodo(id)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        setError('');
      })
      .catch(() => showError('Unable to delete todo'))
      .finally(() => setLoadingTodos(prev => ({ ...prev, [id]: false })));
  };

  const clearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    if (!completedTodos.length) {
      return;
    }

    setLoadingTodos(
      completedTodos.reduce((acc, t) => ({ ...acc, [t.id]: true }), {}),
    );
    Promise.all(completedTodos.map(todo => removeTodo(todo.id)))
      .then(() => setTodos(prev => prev.filter(todo => !todo.completed)))
      .catch(() => showError('Unable to clear completed todos'))
      .finally(() => setLoadingTodos({}));
  };

  const isAnyLoading = Object.values(loadingTodos).some(v => v);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
         newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
          addTodo={addTodo}
          toggleAllTodos={toggleAllTodos}
          todos={todos}
          isAnyLoading={isAnyLoading}
        />

        {visibleTodos.length > 0 && (
          <TodoList
            todos={visibleTodos}
            loadingTodos={loadingTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
            isAnyLoading={isAnyLoading}
          />
        )}
      </div>

      <div>
        <ErrorNotification error={error} setError={setError} />
      </div>
    </div>
  );
};
