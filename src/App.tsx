/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    let timer: number | null = null;

    const loadTodos = async () => {
      setIsLoading(true); // Показуємо спіннер
      setError(null); // Очищаємо попередні помилки

      try {
        const data = await getTodos();

        setTodos(data);
      } catch (err) {
        setError(err?.message || 'Unable to load todos');

        timer = window.setTimeout(() => setError(null), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    void loadTodos();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const getFilteredTodos = () => {
    switch (status) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        return todos;
    }
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {isLoading ? (
          <p>Завантаження...</p>
        ) : (
          todos.length > 0 && (
            <section className="todoapp__main" data-cy="TodoList">
              {/* This is a completed todo */}
              {getFilteredTodos().map(todo => (
                <div
                  data-cy="Todo"
                  className={todo.completed ? 'todo completed' : 'todo'}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      readOnly
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => {}}
                  >
                    x
                  </button>

                  <div data-cy="TodoLoader" className="modal overlay">
                    {/*eslint-disable-next-line max-len*/}
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>
          )
        )}

        {todos.length > 0 && (
          // Hide the footer if there are no todos
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${status === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setStatus('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${status === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setStatus('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${status === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setStatus('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosCount == 0}
              onClick={() => {}}
            >
              Clear completed
            </button>
          </footer>
        )}

        {/*DON'T use conditional rendering to hide the notification*/}
        {/* Add the 'hidden' class to hide the message smoothly */}
        <div
          data-cy="ErrorNotification"
          className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
        >
          {error}
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setError(null)}
          />
        </div>
      </div>
    </div>
  );
};
