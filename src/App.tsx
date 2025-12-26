/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import {
  getTodos,
  postTodos,
  deleteTodo,
  updateTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<(Todo & { loading?: boolean })[]>([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  /* =========================
     Fetch todos
  ========================= */
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
        setError('Unable to load todos');
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

  /* =========================
     Add todo
  ========================= */
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title should not be empty');

      return;
    }

    try {
      setLoading(true);
      const newTodo = await postTodos({ title: title.trim() });

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
    } catch {
      setError('Unable to add a todo');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  /* =========================
     Delete todo (LOCAL loader)
  ========================= */
  const deleteTodoItem = async (todoId: number) => {
    try {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId ? { ...todo, loading: true } : todo,
        ),
      );

      await deleteTodo(todoId);

      setTodos(prev => prev.filter(todo => todo.id !== todoId));
    } catch {
      setError('Unable to delete todo');
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId ? { ...todo, loading: false } : todo,
        ),
      );
    }
  };

  /* =========================
     Toggle completed (LOCAL loader)
  ========================= */
  const toggleTodo = async (todoId: number) => {
    const currentTodo = todos.find(todo => todo.id === todoId);

    if (!currentTodo) {
      return;
    }

    try {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId ? { ...todo, loading: true } : todo,
        ),
      );

      await updateTodo({
        ...currentTodo,
        completed: !currentTodo.completed,
      });

      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId
            ? { ...todo, completed: !todo.completed, loading: false }
            : todo,
        ),
      );
    } catch {
      setError('Unable to update todo');
      setTodos(prev =>
        prev.map(todo =>
          todo.id === todoId ? { ...todo, loading: false } : todo,
        ),
      );
    }
  };

  /* =========================
     Toggle all
  ========================= */
  const toggleAllTodos = async () => {
    try {
      const allCompleted = todos.every(todo => todo.completed);
      const newCompleted = !allCompleted;

      setTodos(prev => prev.map(todo => ({ ...todo, loading: true })));

      await Promise.all(
        todos.map(todo =>
          updateTodo({
            id: todo.id,
            title: todo.title,
            completed: newCompleted,
          }),
        ),
      );

      setTodos(prev =>
        prev.map(todo => ({
          ...todo,
          completed: newCompleted,
          loading: false,
        })),
      );
    } catch {
      setError('Unable to toggle all todos');
      setTodos(prev => prev.map(todo => ({ ...todo, loading: false })));
    }
  };

  /* =========================
     Delete completed
  ========================= */
  const deleteCompletedTodos = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);

      setTodos(prev =>
        prev.map(todo => (todo.completed ? { ...todo, loading: true } : todo)),
      );

      await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));

      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch {
      setError('Unable to delete completed todos');
      setTodos(prev => prev.map(todo => ({ ...todo, loading: false })));
    }
  };

  /* =========================
     Derived data
  ========================= */
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
  const activeCount = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              onClick={toggleAllTodos}
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={addTodo}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {!loading &&
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', {
                  completed: todo.completed,
                })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    disabled={todo.loading}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                {/* Loader ALWAYS exists */}
                <Loader isActive={!!todo.loading} />

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => deleteTodoItem(todo.id)}
                  disabled={todo.loading}
                >
                  ×
                </button>
              </div>
            ))}
        </section>

        {todos.length > 0 && !loading && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                data-cy="FilterLinkAll"
                className={classNames('filter__link', {
                  selected: filter === 'all',
                })}
                onClick={e => {
                  e.preventDefault();
                  setFilter('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                data-cy="FilterLinkActive"
                className={classNames('filter__link', {
                  selected: filter === 'active',
                })}
                onClick={e => {
                  e.preventDefault();
                  setFilter('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                data-cy="FilterLinkCompleted"
                className={classNames('filter__link', {
                  selected: filter === 'completed',
                })}
                onClick={e => {
                  e.preventDefault();
                  setFilter('completed');
                }}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              data-cy="ClearCompletedButton"
              className="todoapp__clear-completed"
              disabled={!todos.some(todo => todo.completed)}
              onClick={deleteCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
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
