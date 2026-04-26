import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

type Status = 'all' | 'active' | 'completed';

type ErrorType = '' | 'load' | 'title' | 'add' | 'delete' | 'update';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>('all');
  const [isAdding, setIsAdding] = useState(false);

  const [title, setTitle] = useState('');

  const [error, setError] = useState<ErrorType>('');

  const activeTodos = todos.filter(todo => !todo.completed);
  const hasCompleted = todos.some(todo => todo.completed);

  const filteredTodos = todos.filter(todo => {
    if (status === 'active') {
      return !todo.completed;
    }

    if (status === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setError('load');
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
      setError('');
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

          {/* Add a todo on form submit */}
          <form
            onSubmit={event => {
              event.preventDefault();

              if (!title.trim()) {
                setError('title');

                return;
              }

              const newTodo = {
                title,
                completed: false,
                userId: USER_ID,
              };

              setIsAdding(true);

              addTodo(newTodo)
                .then(todoFromServer => {
                  setTodos(prev => [...prev, todoFromServer]);
                  setTitle('');
                })
                .catch(() => {
                  setError('add');
                })
                .finally(() => {
                  setIsAdding(false);
                });
            }}
          >
            <input
              autoFocus
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={isAdding}
              value={title}
              onChange={event => {
                setTitle(event.target.value);
              }}
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
                  selected: status === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setStatus('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: status === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setStatus('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: status === 'completed',
                })}
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
        {error === 'load' && 'Unable to load todos'}
        {error === 'title' && 'Title should not be empty'}
        {error === 'add' && 'Unable to add a todo'}
        {error === 'delete' && 'Unable to delete a todo'}
        {error === 'update' && 'Unable to update a todo'}
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setError('');
          }}
        />
      </div>
    </div>
  );
};