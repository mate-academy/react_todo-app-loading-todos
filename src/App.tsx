/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

interface TodoMeta extends Todo {
  isPending?: boolean;
  isEditing?: boolean;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoMeta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [newTitle, setNewTitle] = useState('');
  const newInputRef = useRef<HTMLInputElement>(null);

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const list = await getTodos();

      setTodos(list);
    } catch {
      showError('Unable to load todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();

    if (!title) {
      showError('Title should not be empty');

      return;
    }

    setError('');
    setNewTitle('');
    try {
      const todo = await addTodo(title);

      setTodos(prev => [...prev, todo]);
      newInputRef.current?.focus();
    } catch {
      showError('Unable to add a todo');
      setNewTitle(title);
    }
  };

  const markPending = (id: number, val: boolean) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, isPending: val } : t)),
    );
  };

  const handleDelete = async (id: number) => {
    markPending(id, true);
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      markPending(id, false);
      showError('Unable to delete a todo');
    }
  };

  const handleToggle = async (t: TodoMeta) => {
    markPending(t.id, true);

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const updated = await updateTodo(t.id, { completed: !t.completed });

      setTodos(prev => prev.map(x => (x.id === t.id ? updated : x)));
    } catch {
      showError('Unable to update a todo');
      markPending(t.id, false);
    }
  };

  const handleEditStart = (id: number) => {
    setTodos(prev => prev.map(t => ({ ...t, isEditing: t.id === id })));
  };

  const handleEditSubmit = async (id: number, title: string) => {
    const clean = title.trim();

    if (!clean) {
      handleDelete(id);

      return;
    }

    markPending(id, true);
    try {
      const updated = await updateTodo(id, { title: clean });

      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch {
      showError('Unable to update a todo');
      markPending(id, false);
    } finally {
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, isEditing: false } : t)),
      );
    }
  };

  const handleClearCompleted = async () => {
    const done = todos.filter(t => t.completed);

    for (const t of done) {
      await handleDelete(t.id);
    }
  };

  const filtered = todos.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed,
  );
  const left = todos.filter(t => !t.completed).length;
  const allDone = todos.length > 0 && left === 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', { active: allDone })}
            data-cy="ToggleAllButton"
            disabled
          />

          <form onSubmit={handleAdd}>
            <input
              ref={newInputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              disabled={isLoading}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filtered.map(t =>
              t.isEditing ? (
                <form
                  key={t.id}
                  onSubmit={e => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const input = form.querySelector(
                      'input',
                    ) as HTMLInputElement;

                    handleEditSubmit(t.id, input.value);
                  }}
                >
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    defaultValue={t.title}
                    disabled={t.isPending}
                    autoFocus
                  />
                </form>
              ) : (
                <div
                  key={t.id}
                  data-cy="Todo"
                  className={classNames('todo', { completed: t.completed })}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={t.completed}
                      disabled={t.isPending}
                      onChange={() => handleToggle(t)}
                    />
                  </label>

                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => handleEditStart(t.id)}
                  >
                    {t.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    disabled={t.isPending}
                    onClick={() => handleDelete(t.id)}
                  >
                    ×
                  </button>

                  <div
                    data-cy="TodoLoader"
                    className={classNames('modal overlay', {
                      'is-active': t.isPending,
                    })}
                  >
                    {/* eslint-disable-next-line max-len */}
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>

                </div>
              ),
            )}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {left} items left
            </span>
            <nav className="filter" data-cy="Filter">
              {(['all', 'active', 'completed'] as Filter[]).map(f => (
                <a
                  key={f}
                  href={`#/${f}`}
                  className={classNames('filter__link', {
                    selected: filter === f,
                  })}
                  data-cy={`FilterLink${f[0].toUpperCase()}${f.slice(1)}`}
                  onClick={() => setFilter(f)}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(t => !t.completed)}
              onClick={handleClearCompleted}
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
