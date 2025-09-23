/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

enum ErrorMessage {
  LoadTodos = 'Unable to load todos',
  UpdateTodo = 'Unable to update todo',
  DeleteTodo = 'Unable to delete todo',
  AddTodo = 'Unable to add a todo',
  ClearCompleted = 'Unable to clear completed todos',
  EmptyTitle = 'Title should not be empty',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    async function loadTodos() {
      try {
        setIsLoading(true);
        const loadedTodos = await getTodos();

        setTodos(loadedTodos.map(todo => ({ ...todo, isSaving: false })));
      } catch {
        setErrorMessage(ErrorMessage.LoadTodos);
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
    if (filter === Filter.Active) {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === Filter.Completed) {
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
      setErrorMessage(ErrorMessage.UpdateTodo);

      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, isSaving: false } : t)),
      );
    }
  }

  async function deleteTodo(id: number) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, isSaving: true } : t)),
    );

    try {
      await client.delete(`/todos/${id}`);

      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      setErrorMessage(ErrorMessage.DeleteTodo);

      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, isSaving: false } : t)),
      );
    }
  }

  async function addTodo(title: string) {
    if (!title.trim()) {
      setErrorMessage(ErrorMessage.EmptyTitle);

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
      setErrorMessage(ErrorMessage.AddTodo);
    }
  }

  async function clearCompleted() {
    try {
      const completedIds = todos.filter(t => t.completed).map(t => t.id);

      await Promise.all(completedIds.map(id => client.delete(`/todos/${id}`)));
      setTodos(prev => prev.filter(t => !t.completed));
    } catch {
      setErrorMessage(ErrorMessage.ClearCompleted);
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
          ) : !!getVisibleTodos().length ? (
            getVisibleTodos().map(todo => (
              <div
                key={todo.id}
                className={`todo ${todo.completed ? 'completed' : ''}`}
                data-cy="Todo"
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    data-cy="TodoStatus"
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

                <div
                  data-cy="TodoLoader"
                  className={`modal overlay ${todo.isSaving ? 'is-active' : ''}`}
                >
                  <div
                    className="modal-background
                    has-background-white-ter"
                  />
                  <div className="loader" />
                </div>
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
                className={`filter__link ${filter === Filter.All ? 'selected' : ''}`}
                onClick={() => setFilter(Filter.All)}
                data-cy="FilterLinkAll"
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${filter === Filter.Active ? 'selected' : ''}`}
                onClick={() => setFilter(Filter.Active)}
                data-cy="FilterLinkActive"
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${filter === Filter.Completed ? 'selected' : ''}`}
                onClick={() => setFilter(Filter.Completed)}
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
