/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, addTodo, updateTodo, deleteTodoById, USER_ID } from './api/todos';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [savingIds, setSavingIds] = useState<Set<number>>(new Set());
  const errorTimeout = useRef<number | null>(null);
  const newTodoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadTodos();
    return () => {
      if (errorTimeout.current) clearTimeout(errorTimeout.current);
    };
  }, []);

  const loadTodos = () => {
    setLoading(true);
    setError(null);
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (error) {
      if (errorTimeout.current) window.clearTimeout(errorTimeout.current);
      errorTimeout.current = window.setTimeout(() => setError(null), 3000);
    }
  }, [error]);

  const addNewTodo = (title: string) => {
    if (!title.trim()) {
      setError('Title should not be empty');
      if (newTodoInputRef.current) newTodoInputRef.current.focus();
      return;
    }
    setLoading(true);
    setError(null);
    addTodo({ title, completed: false, userId: USER_ID })
      .then((added) => {
        setTodos((prev) => [...prev, added]);
        setNewTodoTitle('');
        if (newTodoInputRef.current) newTodoInputRef.current.focus();
      })
      .catch(() => {
        setError('Unable to add a todo');
      })
      .finally(() => setLoading(false));
  };

  const onSubmitNewTodo = (e: React.FormEvent) => {
    e.preventDefault();
    addNewTodo(newTodoTitle);
  };

  const deleteTodo = (id: number) => {
    setSavingIds((ids) => new Set(ids).add(id));
    setError(null);
    deleteTodoById(id)
      .then(() => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      })
      .catch(() => setError('Unable to delete a todo'))
      .finally(() => {
        setSavingIds((ids) => {
          const copy = new Set(ids);
          copy.delete(id);
          return copy;
        });
      });
  };

  const toggleTodoCompleted = (todo: Todo) => {
    setSavingIds((ids) => new Set(ids).add(todo.id));
    setError(null);
    updateTodo(todo.id, { completed: !todo.completed })
      .then((updated) => {
        setTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? updated : t))
        );
      })
      .catch(() => setError('Unable to update a todo'))
      .finally(() => {
        setSavingIds((ids) => {
          const copy = new Set(ids);
          copy.delete(todo.id);
          return copy;
        });
      });
  };

  const clearCompleted = () => {
    const completedTodos = todos.filter((t) => t.completed);
    setLoading(true);
    setError(null);
    Promise.all(completedTodos.map((t) => deleteTodoById(t.id)))
      .then(() => {
        setTodos((prev) => prev.filter((t) => !t.completed));
      })
      .catch(() => setError('Unable to delete a todo'))
      .finally(() => setLoading(false));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === Filter.All) return true;
    if (filter === Filter.Active) return !todo.completed;
    if (filter === Filter.Completed) return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedExists = todos.some((t) => t.completed);

  const onFilterClick = (f: Filter) => (e: React.MouseEvent) => {
    e.preventDefault();
    setFilter(f);
  };

  if (!USER_ID) {
    return <div>Please register a user and set USER_ID.</div>;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${
              todos.length > 0 && activeCount === 0 ? 'active' : ''
            }`}
            disabled={loading || todos.length === 0}
            aria-label="Toggle all todos"
            onClick={() => {
              const shouldComplete = activeCount > 0;
              setLoading(true);
              setError(null);
              Promise.all(
                todos.map((t) =>
                  updateTodo(t.id, { completed: shouldComplete })
                )
              )
                .then(() => {
                  setTodos((prev) =>
                    prev.map((t) => ({ ...t, completed: shouldComplete }))
                  );
                })
                .catch(() => setError('Unable to update a todo'))
                .finally(() => setLoading(false));
            }}
          />

          <form onSubmit={onSubmitNewTodo}>
            <input
              ref={newTodoInputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              disabled={loading}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {loading && (
            <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          )}

          {filteredTodos.length === 0 && !loading && (
            <p>No todos</p>
          )}

          <ul className="todo-list">
            {filteredTodos.map((todo) => {
              const isSaving = savingIds.has(todo.id);
              return (
                <li
                  key={todo.id}
                  className={`todo ${todo.completed ? 'completed' : ''}`}
                  data-cy="Todo"
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      disabled={isSaving || loading}
                      onChange={() => toggleTodoCompleted(todo)}
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    disabled={isSaving || loading}
                    onClick={() => deleteTodo(todo.id)}
                  >
                    ×
                  </button>

                  <div
                    data-cy="TodoLoader"
                    className={`modal overlay ${isSaving ? 'is-active' : ''}`}
                  >
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} item{activeCount !== 1 ? 's' : ''} left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === Filter.All ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={onFilterClick(Filter.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === Filter.Active ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={onFilterClick(Filter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === Filter.Completed ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={onFilterClick(Filter.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!completedExists || loading}
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          error ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error}
      </div>
    </div>
  );
};
