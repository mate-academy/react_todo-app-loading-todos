/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoLoader } from './api/components/loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const hasTodos = todos.length > 0;

  return (
    <div className="todoapp">
      {!USER_ID && <UserWarning />}

      {USER_ID && (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <header className="todoapp__header">
              <button
                type="button"
                className="todoapp__toggle-all active"
                data-cy="ToggleAllButton"
              />

              <form>
                <input
                  data-cy="NewTodoField"
                  type="text"
                  className="todoapp__new-todo"
                  placeholder="What needs to be done?"
                />
              </form>
            </header>

            <section
              className={`todoapp__main ${!hasTodos ? 'hidden' : ''}`}
              data-cy="TodoList"
            >
              {visibleTodos.map(todo => (
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
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>

                  <TodoLoader />
                  </div>
              ))}
            </section>

            {/* footer ховаємо, якщо немає todo */}
            {hasTodos && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {todos.filter(todo => !todo.completed).length} items left
                </span>

                <nav className="filter" data-cy="Filter">
                  <a
                    href="#/"
                    className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                    data-cy="FilterLinkAll"
                    onClick={() => setFilter('all')}
                  >
                    All
                  </a>
                  <a
                    href="#/active"
                    className={`filter__link ${
                      filter === 'active' ? 'selected' : ''
                    }`}
                    data-cy="FilterLinkActive"
                    onClick={() => setFilter('active')}
                  >
                    Active
                  </a>
                  <a
                    href="#/completed"
                    className={`filter__link ${
                      filter === 'completed' ? 'selected' : ''
                    }`}
                    data-cy="FilterLinkCompleted"
                    onClick={() => setFilter('completed')}
                  >
                    Completed
                  </a>
                </nav>

                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              </footer>
            )}

            {/* Notification */}
            <div
              data-cy="ErrorNotification"
              className={`notification is-danger is-light has-text-weight-normal ${
                !errorMessage ? 'hidden' : ''
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
        </>
      )}
    </div>
  );
};
