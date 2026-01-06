/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [newTitle, setNewTitle] = useState<string>('');
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [tempIds, setTempIds] = useState<number[]>([]);

  const hideTimer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function clearHideTimer() {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }

  function hideErrorSoon() {
    clearHideTimer();
    hideTimer.current = window.setTimeout(() => {
      setError(null);
    }, 3000);
  }

  function showError(message: string) {
    setError(message);
    hideErrorSoon();
  }

  useEffect(() => {
    // focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // load todos
    setLoading(true);
    // hide any previous error before new request
    setError(null);

    getTodos()
      .then(list => {
        setTodos(list || []);
      })
      .catch(() => {
        setError('Unable to load todos');

        if (hideTimer.current) {
          window.clearTimeout(hideTimer.current);
          hideTimer.current = null;
        }

        hideTimer.current = window.setTimeout(() => {
          setError(null);
        }, 3000);
      })
      .finally(() => setLoading(false));

    return () => clearHideTimer();
  }, []);

  // filter handlers
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash;

      if (hash === '#/active') {
        setFilter('active');
      } else if (hash === '#/completed') {
        setFilter('completed');
      } else {
        setFilter('all');
      }
    }

    onHashChange();
    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const filtered = todos.filter(t => {
    if (filter === 'active') {
      return !t.completed;
    }

    if (filter === 'completed') {
      return t.completed;
    }

    return true;
  });

  const activeCount = todos.filter(
    t => !t.completed && !tempIds.includes(t.id),
  ).length;
  const allCompleted = todos.length > 0 && todos.every(t => t.completed);
  const completedCount = todos.filter(t => t.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* show toggle only when todos exist and initial load finished */}
          {!loading && todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              aria-label="Toggle all"
              onClick={() => {
                // hide previous error
                clearHideTimer();
                setError(null);

                const target = !allCompleted; // true -> make completed, false -> make active

                // send updates only for todos that need change
                todos.forEach(todo => {
                  if (todo.completed === target) {
                    return;
                  }

                  setLoadingIds(prev => [...prev, todo.id]);

                  updateTodo(todo.id, { completed: target })
                    .then(updated => {
                      setTodos(prev =>
                        prev.map(t => (t.id === todo.id ? updated : t)),
                      );
                      setLoadingIds(prev => prev.filter(id => id !== todo.id));
                    })
                    .catch(() => {
                      setLoadingIds(prev => prev.filter(id => id !== todo.id));
                      showError('Unable to update a todo');
                    });
                });
              }}
            />
          )}

          <form
            onSubmit={e => {
              e.preventDefault();
              // start new request: hide previous error
              clearHideTimer();
              setError(null);

              const title = newTitle.trim();

              if (!title) {
                showError('Title should not be empty');
                inputRef.current?.focus();

                return;
              }

              setInputDisabled(true);

              const tempId = Math.floor(Math.random() * -1000000);
              const tempTodo: Todo = {
                id: tempId,
                userId: USER_ID,
                title,
                completed: false,
              };

              setTodos(prev => [...prev, tempTodo]);
              setTempIds(prev => [...prev, tempId]);
              setLoadingIds(prev => [...prev, tempId]);

              createTodo(title)
                .then(created => {
                  setTodos(prev =>
                    prev.map(t => (t.id === tempId ? created : t)),
                  );
                  setTempIds(prev => prev.filter(id => id !== tempId));
                  setLoadingIds(prev => prev.filter(id => id !== tempId));
                  setInputDisabled(false);
                  setNewTitle('');
                  inputRef.current?.focus();
                })
                .catch(() => {
                  setTodos(prev => prev.filter(t => t.id !== tempId));
                  setTempIds(prev => prev.filter(id => id !== tempId));
                  setLoadingIds(prev => prev.filter(id => id !== tempId));
                  setInputDisabled(false);
                  showError('Unable to add a todo');
                  inputRef.current?.focus();
                });
            }}
          >
            <input
              data-cy="NewTodoField"
              ref={inputRef}
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              disabled={inputDisabled}
            />
          </form>
        </header>

        {/* Hide list when there are no todos */}
        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filtered.map(todo => {
              const isLoading = loadingIds.includes(todo.id);
              const loaderClass = `modal overlay ${isLoading ? 'is-active' : ''}`;

              return (
                <div
                  key={todo.id}
                  data-cy="Todo"
                  className={`todo ${todo.completed ? 'completed' : ''}`}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => {
                        clearHideTimer();
                        setError(null);
                        setLoadingIds(prev => [...prev, todo.id]);

                        updateTodo(todo.id, { completed: !todo.completed })
                          .then(updated => {
                            setTodos(prev =>
                              prev.map(t => (t.id === todo.id ? updated : t)),
                            );
                            setLoadingIds(prev =>
                              prev.filter(id => id !== todo.id),
                            );
                          })
                          .catch(() => {
                            setLoadingIds(prev =>
                              prev.filter(id => id !== todo.id),
                            );
                            showError('Unable to update a todo');
                          });
                      }}
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => {
                      clearHideTimer();
                      setError(null);

                      if (tempIds.includes(todo.id)) {
                        setTodos(prev => prev.filter(t => t.id !== todo.id));
                        setTempIds(prev => prev.filter(id => id !== todo.id));
                        setLoadingIds(prev =>
                          prev.filter(id => id !== todo.id),
                        );
                        setInputDisabled(false);
                        inputRef.current?.focus();

                        return;
                      }

                      setLoadingIds(prev => [...prev, todo.id]);
                      deleteTodo(todo.id)
                        .then(() => {
                          setTodos(prev => prev.filter(t => t.id !== todo.id));
                          setLoadingIds(prev =>
                            prev.filter(id => id !== todo.id),
                          );
                          inputRef.current?.focus();
                        })
                        .catch(() => {
                          setLoadingIds(prev =>
                            prev.filter(id => id !== todo.id),
                          );
                          showError('Unable to delete a todo');
                        });
                    }}
                  >
                    ×
                  </button>

                  <div data-cy="TodoLoader" className={loaderClass}>
                    <div className="modal-background 
                    has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Footer hidden when no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                onClick={() => setFilter('all')}
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                onClick={() => setFilter('active')}
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                onClick={() => setFilter('completed')}
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedCount === 0}
              onClick={() => {
                clearHideTimer();
                setError(null);

                const completedTodos = todos.filter(t => t.completed);

                if (completedTodos.length === 0) {
                  return;
                }

                completedTodos.forEach(todo => {
                  setLoadingIds(prev => [...prev, todo.id]);

                  deleteTodo(todo.id)
                    .then(() => {
                      setTodos(prev => prev.filter(t => t.id !== todo.id));
                      setLoadingIds(prev => prev.filter(id => id !== todo.id));
                      inputRef.current?.focus();
                    })
                    .catch(() => {
                      setLoadingIds(prev => prev.filter(id => id !== todo.id));
                      showError('Unable to delete a todo');
                    });
                });
              }}
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
