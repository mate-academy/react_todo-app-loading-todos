import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  deleteTodo,
  getTodos,
  postTodos,
  updateTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filter';
import { Errors } from './constants/errors';
import classNames from "classnames";

export const App: React.FC = () => {
  const [todos, setTodos] = useState<(Todo & { loading?: boolean })[]>([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  /* Fetch todos */
  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const fetchTodos = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getTodos();

        setTodos(data);
      } catch {
        setError(Errors.LoadTodosFailed);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  /* Add todo */
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError(Errors.EmptyTitle);

      return;
    }

    try {
      setLoading(true);
      const newTodo = await postTodos({ title: title.trim() });

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
    } catch {
      setError(Errors.AddTodoFailed);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  /* Toggle todo */
  const toggleTodo = async (todoId: number) => {
    const currentTodo = todos.find(t => t.id === todoId);

    if (!currentTodo) {
      return;
    }

    try {
      setTodos(prev =>
        prev.map(t => (t.id === todoId ? { ...t, loading: true } : t)),
      );
      await updateTodo({ ...currentTodo, completed: !currentTodo.completed });
      setTodos(prev =>
        prev.map(t =>
          t.id === todoId
            ? { ...t, completed: !t.completed, loading: false }
            : t,
        ),
      );
    } catch {
      setError(Errors.UpdateTodoFailed);
      setTodos(prev =>
        prev.map(t => (t.id === todoId ? { ...t, loading: false } : t)),
      );
    }
  };

  /* Delete todo */
  const deleteTodoItem = async (todoId: number) => {
    try {
      setTodos(prev =>
        prev.map(t => (t.id === todoId ? { ...t, loading: true } : t)),
      );
      await deleteTodo(todoId);
      setTodos(prev => prev.filter(t => t.id !== todoId));
    } catch {
      setError(Errors.DeleteTodoFailed);
      setTodos(prev =>
        prev.map(t => (t.id === todoId ? { ...t, loading: false } : t)),
      );
    }
  };

  /* Derived data */
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const allCompleted = todos.length > 0 && todos.every(t => t.completed);
  const activeCount = todos.filter(t => !t.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <Header
        allCompleted={allCompleted}
        title={title}
        setTitle={setTitle}
        onAddTodo={addTodo}
        loading={loading}
        filter={filter}
        setFilter={setFilter}
        onToggleAll={async () => {
          try {
            const newCompleted = !allCompleted;

            setTodos(prev => prev.map(t => ({ ...t, loading: true })));
            await Promise.all(
              todos.map(t => updateTodo({ ...t, completed: newCompleted })),
            );
            setTodos(prev =>
              prev.map(t => ({
                ...t,
                completed: newCompleted,
                loading: false,
              })),
            );
          } catch {
            setError(Errors.ToggleAllFailed);
            setTodos(prev => prev.map(t => ({ ...t, loading: false })));
          }
        }}
        inputRef={inputRef}
      />

      <Main
        todos={todos}
        filteredTodos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodoItem={deleteTodoItem}
        loading={loading}
      />

      {todos.length > 0 && !loading && (
        <Footer
          todos={todos}
          activeCount={activeCount}
          filter={filter}
          setFilter={setFilter}
          onDeleteCompleted={async () => {
            const completedTodos = todos.filter(t => t.completed);

            setTodos(prev =>
              prev.map(t => (t.completed ? { ...t, loading: true } : t)),
            );
            await Promise.all(completedTodos.map(t => deleteTodo(t.id)));
            setTodos(prev => prev.filter(t => !t.completed));
          }}
        />
      )}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error }
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>


    </div>
  );
};
