import React, { useEffect, useRef, useState } from 'react';
import {
  USER_ID,
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const [newTitle, setNewTitle] = useState('');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const loadTodos = async () => {
    setError('');

    try {
      const data = await getTodos();

      setTodos(data);
    } catch {
      setError('Unable to load todos');
      setTimeout(() => setError(''), 3000);
    }
  };

  useEffect(() => {
    loadTodos();
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = newTitle.trim();

    if (!title) {
      showError('Title should not be empty');

      return;
    }

    setIsAdding(true);

    try {
      const todo = await addTodo(title);

      setTodos(prev => [...prev, todo]);
      setNewTitle('');
    } catch {
      showError('Unable to add a todo');
    } finally {
      setIsAdding(false);
      inputRef.current?.focus();
    }
  };

  const handleDelete = async (id: number) => {
    setLoadingIds(prev => [...prev, id]);

    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      showError('Unable to delete a todo');
    } finally {
      setLoadingIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleToggle = async (todo: Todo) => {
    setLoadingIds(prev => [...prev, todo.id]);

    try {
      const updated = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
    } catch {
      showError('Unable to update a todo');
    } finally {
      setLoadingIds(prev => prev.filter(i => i !== todo.id));
    }
  };

  const handleToggleAll = async () => {
    const allCompleted = todos.every(t => t.completed);

    await Promise.all(
      todos.map(todo => updateTodo(todo.id, { completed: !allCompleted })),
    );

    loadTodos();
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleUpdate = async (todo: Todo) => {
    const title = editingTitle.trim();

    if (!title) {
      handleDelete(todo.id);

      return;
    }

    if (title === todo.title) {
      setEditingId(null);

      return;
    }

    setLoadingIds(prev => [...prev, todo.id]);

    try {
      const updated = await updateTodo(todo.id, { title });

      setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));

      setEditingId(null);
    } catch {
      showError('Unable to update a todo');
    } finally {
      setLoadingIds(prev => prev.filter(i => i !== todo.id));
    }
  };

  const handleKey = (e: React.KeyboardEvent, todo: Todo) => {
    if (e.key === 'Enter') {
      handleUpdate(todo);
    }

    if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const visibleTodos = todos.filter(t => {
    if (filter === 'active') {
      return !t.completed;
    }

    if (filter === 'completed') {
      return t.completed;
    }

    return true;
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* ✅ ВЕРНУЛИ ToggleAllButton */}
          <button
            type="button"
            data-cy="ToggleAllButton"
            className={`todoapp__toggle-all ${
              todos.length && todos.every(t => t.completed) ? 'active' : ''
            }`}
            onClick={handleToggleAll}
          />

          <form onSubmit={handleAdd}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              disabled={isAdding}
            />
          </form>
        </header>

        {!!todos.length && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => {
              const isLoading = loadingIds.includes(todo.id);
              const isEditing = editingId === todo.id;

              return (
                <div
                  key={todo.id}
                  data-cy="Todo"
                  className={`todo ${todo.completed ? 'completed' : ''}`}
                >
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                    disabled={isLoading}
                  />

                  {isEditing ? (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleUpdate(todo);
                      }}
                    >
                      <input
                        data-cy="TodoTitleField"
                        className="todo__title-field"
                        value={editingTitle}
                        onChange={e => setEditingTitle(e.target.value)}
                        onBlur={() => handleUpdate(todo)}
                        onKeyDown={e => handleKey(e, todo)}
                        autoFocus
                      />
                    </form>
                  ) : (
                    <>
                      <span
                        data-cy="TodoTitle"
                        className="todo__title"
                        onDoubleClick={() => startEdit(todo)}
                      >
                        {todo.title}
                      </span>

                      <button
                        type="button"
                        data-cy="TodoDelete"
                        className="todo__remove"
                        onClick={() => handleDelete(todo.id)}
                        disabled={isLoading}
                      >
                        ×
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                className="filter__link"
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                className="filter__link"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                data-cy="FilterLinkCompleted"
                className="filter__link"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              data-cy="ClearCompletedButton"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`
          notification is-danger is-light
          ${error ? '' : 'hidden'}
        `}
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
