/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    async function loadTodos() {
      try {
        setIsLoading(true);
        const loadedTodos = await getTodos();

        setTodos(loadedTodos.map(todo => ({ ...todo, isSaving: false })));
      } catch {
        setErrorMessage('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    }

    loadTodos();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (errorMessage) {
      timer = setTimeout(() => setErrorMessage(''), 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [errorMessage]);

  function getVisibleTodos() {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  async function toggleTodo(id: number) {
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, isSaving: true } : t)),
    );

    await new Promise(res => setTimeout(res, 150));

    try {
      await client.patch(`/todos/${id}`, { completed: !todo.completed });

      setTodos(prev =>
        prev.map(t =>
          t.id === id
            ? { ...t, completed: !todo.completed, isSaving: false }
            : t,
        ),
      );
    } catch {
      setErrorMessage('Unable to update todo');

      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, isSaving: false } : t)),
      );
    }
  }

  async function deleteTodo(id: number) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, isSaving: true } : t)),
    );

    await new Promise(res => setTimeout(res, 150));

    try {
      await client.delete(`/todos/${id}`);

      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      setErrorMessage('Unable to delete todo');

      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, isSaving: false } : t)),
      );
    }
  }

  async function addTodo(title: string) {
    if (!title.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    try {
      const newTodo = await client.post<Todo>('/todos', {
        title,
        userId: USER_ID,
        completed: false,
      });

      setTodos(prev => [...prev, newTodo]);
    } catch {
      setErrorMessage('Unable to add a todo');
    }
  }

  async function clearCompleted() {
    try {
      const completedIds = todos.filter(t => t.completed).map(t => t.id);

      await Promise.all(completedIds.map(id => client.delete(`/todos/${id}`)));
      setTodos(prev => prev.filter(t => !t.completed));
    } catch {
      setErrorMessage('Unable to clear completed todos');
    }
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form
            onSubmit={e => {
              e.preventDefault();
              const input = e.currentTarget.elements[0] as HTMLInputElement;

              addTodo(input.value);
              input.value = '';
            }}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {isLoading ? (
            <p>Loading...</p>
          ) : getVisibleTodos().length > 0 ? (
            getVisibleTodos().map(todo => (
              <div
                key={todo.id}
                className={`todo ${todo.completed ? 'completed' : ''}`}
                data-cy="Todo"
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    disabled={todo.isSaving}
                  />
                </label>

                <span className="todo__title" data-cy="TodoTitle">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => deleteTodo(todo.id)}
                  disabled={todo.isSaving}
                >
                  ×
                </button>

                {todo.isSaving && (
                  <div data-cy="TodoLoader" className="modal overlay is-active">
                    <div
                      className="modal-background
                    has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                )}
              </div>
            ))
          ) : null}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(t => !t.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                onClick={() => setFilter('all')}
                data-cy="FilterLinkAll"
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                onClick={() => setFilter('active')}
                data-cy="FilterLinkActive"
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                onClick={() => setFilter('completed')}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(t => !t.completed)}
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
          errorMessage ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
