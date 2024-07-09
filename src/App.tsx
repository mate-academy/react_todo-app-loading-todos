import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos, loadTodos } from './api/todos';
import classNames from 'classnames';
export enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<Status>(Status.all);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return () => {};
  }, [error]);

  const countActiveTodos = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  const handleNewTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      setError('Title should not be empty');

      return;
    }

    setLoading(true);
    setError(null);
    loadTodos(newTodo)
      .then(addedTodo => {
        setTodos([...todos, addedTodo]);
        setNewTodo('');
      })
      .catch(() => setError('Unable to add a todo'))
      .finally(() => setLoading(false));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === Status.all) {
      return true;
    }

    if (filter === Status.active) {
      return !todo.completed;
    }

    if (filter === Status.completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.length > 0 && todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />
          <form onSubmit={handleNewTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={event => setNewTodo(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {loading ? (
            <div className="loader" data-cy="Loader"></div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', {
                  completed: todo.completed,
                })}
              >
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                </div>
              </div>
            ))
          )}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {countActiveTodos()} items left
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === Status.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(Status.all)}
              >
                All
              </a>
              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === Status.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(Status.active)}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === Status.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(Status.completed)}
              >
                Completed
              </a>
            </nav>

            {todos.some(todo => todo.completed) && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
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
