/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 10876;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [hideError, setHideError] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleErrorMessage = (message: string) => {
    setHideError(false);
    setError(message);

    setTimeout(() => {
      setHideError(true);
    }, 3000);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const todosFromServer = await getTodos(USER_ID);

        if (!todosFromServer.length) {
          handleErrorMessage('Unable to get todos from server');
        }

        setTodos(todosFromServer);
      };

      fetchData();
    } catch (err) {
      throw new Error();
    }
  }, []);


  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed), [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed), [todos],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = {
    all: todos,
    active: activeTodos,
    completed: completedTodos,
  };

  const visibleTodos:Todo[]
    = filteredTodos[filterType as keyof typeof filteredTodos];

  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
  };

  const handleErrorDelete = () => setHideError(true);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {
          todos.length > 0
            && (
              <section className="todoapp__main">
                {visibleTodos.map(todo => (
                  <div
                    className={classNames(
                      'todo',
                      { completed: todo.completed },
                    )}
                    key={todo.id}
                  >
                    <label className="todo__status-label">
                      <input
                        type="checkbox"
                        className="todo__status"
                        checked
                      />
                    </label>

                    <span className="todo__title">{todo.title}</span>

                    <button type="button" className="todo__remove">×</button>

                    <div className="modal overlay">
                      <div
                        className="modal-background has-background-white-ter"
                      />
                      <div className="loader" />
                    </div>
                  </div>
                ))}
              </section>
            )
        }

        {
          todos.length > 0
            && (
              <footer className="todoapp__footer">
                <span className="todo-count">
                  {`${visibleTodos.length} items left`}
                </span>

                <nav className="filter">
                  <a
                    role="button"
                    href="#/"
                    className={classNames(
                      'filter__link',
                      'filter__link__all',
                      { selected: filterType === 'all' },
                    )}
                    onClick={() => handleFilterChange('all')}
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    className={classNames(
                      'filter__link',
                      'filter__link__active',
                      { selected: filterType === 'active' },
                    )}
                    onClick={() => handleFilterChange('active')}
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    className={classNames(
                      'filter__link',
                      'filter__link__completed',
                      { selected: filterType === 'completed' },
                    )}
                    onClick={() => handleFilterChange('completed')}
                  >
                    Completed
                  </a>
                </nav>

                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              </footer>
            )
        }
      </div>

      <div
        className="
          notification
          is-danger
          is-light
          has-text-weight-normal
        "
        hidden={hideError}
      >
        <button type="button" className="delete" onClick={handleErrorDelete} />
        {error}
      </div>
    </div>
  );
};
