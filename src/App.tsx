import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

enum ErrorType {
  None = '',
  Load = 'load',
  Title = 'title',
  Add = 'add',
  Delete = 'delete',
  Update = 'update',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>(Status.All);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<ErrorType>(ErrorType.None);

  const activeTodos = todos.filter(todo => !todo.completed);
  const hasCompleted = todos.some(todo => todo.completed);

  const filteredTodos = todos.filter(todo => {
    if (status === Status.Active) {
      return !todo.completed;
    }

    if (status === Status.Completed) {
      return todo.completed;
    }

    return true;
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setError(ErrorType.Title);

      return;
    }

    const newTodo = {
      title: title.trim(),
      completed: false,
      userId: USER_ID,
    };

    setIsAdding(true);

    addTodo(newTodo)
      .then(todoFromServer => {
        setTodos(prevTodos => [...prevTodos, todoFromServer]);
        setTitle('');
      })
      .catch(() => {
        setError(ErrorType.Add);
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setError(ErrorType.Load);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError(ErrorType.None);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

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

          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={isAdding}
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </form>
        </header>

        {!isLoading && <TodoList todos={filteredTodos} />}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: status === Status.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setStatus(Status.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: status === Status.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setStatus(Status.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: status === Status.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setStatus(Status.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
            >
              Clear completed
            </button>
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
        {error === ErrorType.Load && 'Unable to load todos'}
        {error === ErrorType.Title && 'Title should not be empty'}
        {error === ErrorType.Add && 'Unable to add a todo'}
        {error === ErrorType.Delete && 'Unable to delete a todo'}
        {error === ErrorType.Update && 'Unable to update a todo'}

        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(ErrorType.None)}
        />
      </div>
    </div>
  );
};