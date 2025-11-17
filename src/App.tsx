/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { TodoItem } from './components/TodoItem/TodoItem';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoadingIds, setIsLoadingIds] = useState<number[]>([]);
  const [newTitle, setNewTitle] = useState('');

  const errorRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = React.useRef(true);

  const showError = (message: string) => {
    setErrorMessage(message);

    if (errorRef.current) {
      clearTimeout(errorRef.current);
    }

    errorRef.current = setTimeout(() => {
      setErrorMessage(null);
      errorRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    isMountedRef.current = true;

    setErrorMessage(null);
    setIsLoading(true);

    getTodos()
      .then(response => {
        if (isMountedRef.current) {
          setTodos(response);
        }
      })
      .catch(error => {
        if (isMountedRef.current) {
          showError(error.message || 'Unable to load todos');
        }
      })
      .finally(() => {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      });

    return () => {
      isMountedRef.current = false;

      if (errorRef.current) {
        clearTimeout(errorRef.current);
      }
    };
  }, []);

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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();

    if (!trimmed) {
      showError('Title should not be empty');

      return;
    }

    createTodo(trimmed)
      .then(todo => {
        setTodos(prev => [...prev, todo]);
        setNewTitle('');
      })
      .catch(() => showError('Unable to add a todo'));
  };

  const handleToggle = (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    setIsLoadingIds(prev => [...prev, id]);

    updateTodo(id, { completed: !todo.completed })
      .then(updated => {
        setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      })
      .catch(() => showError('Unable to update a todo'))
      .finally(() => {
        setIsLoadingIds(prev => prev.filter(i => i !== id));
      });
  };

  const handleDelete = (id: number) => {
    setIsLoadingIds(prev => [...prev, id]);

    deleteTodo(id)
      .then(() => {
        if (isMountedRef.current) {
          setTodos(prev => prev.filter(t => t.id !== id));
        }
      })
      .catch(() => {
        if (isMountedRef.current) {
          showError('Unable to delete a todo');
        }
      })
      .finally(() => {
        if (isMountedRef.current) {
          setIsLoadingIds(prev => prev.filter(i => i !== id));
        }
      });
  };

  const handleEdit = (id: number, title: string) => {
    setIsLoadingIds(prev => [...prev, id]);

    updateTodo(id, { title })
      .then(updated => {
        setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
        setEditingId(null);
      })
      .catch(() => showError('Unable to update a todo'))
      .finally(() => {
        setIsLoadingIds(prev => prev.filter(i => i !== id));
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}
          {/* Add a todo on form submit */}

          <form onSubmit={handleCreate}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
          </form>
        </header>

        {!isLoading && todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {/* This is a completed todo */}
            {visibleTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                isLoading={isLoadingIds.includes(todo.id)}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              3 items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={e => {
                  e.preventDefault();
                  setFilter('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
