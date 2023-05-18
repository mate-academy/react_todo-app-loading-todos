import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { SortType } from './types/SortType';
import { TodoItem } from './components/Todo';
import { Notification } from './components/Notification';

const USER_ID = 10354;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [sortType, setSortType] = useState(SortType.All);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isConnection, setIsConnection] = useState(true);

  const isActiveTodos = todos.filter((todo) => !todo.completed);
  const handleError = () => {
    setIsConnection(false);
    setIsErrorMessage(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsConnection(true);
    setIsErrorMessage(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (!title) {
      setIsErrorMessage(true);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    } else {
      getTodos(USER_ID)
        .then(setTodos)
        .then(() => setIsConnection(true))
        .catch(handleError);
    }

    const newTimeOutId = setTimeout(() => {
      setIsErrorMessage(false);
    }, 3000);

    setTimeoutId(newTimeOutId);
  };

  const closeErrorMessage = () => {
    setIsErrorMessage(false);
  };

  const sortByAll = () => {
    setSortType(SortType.All);
  };

  const sortByActive = () => {
    setSortType(SortType.Active);
  };

  const sortByCompleted = () => {
    setSortType(SortType.Completed);
  };

  const visibleTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      switch (sortType) {
        case SortType.Active:
          return !todo.completed;
        case SortType.Completed:
          return todo.completed;
        default:
          return todos;
      }
    });
  }, [todos, sortType]);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    getTodos(USER_ID)
      .then(setTodos)
      .then(() => setIsConnection(true))
      .catch(handleError);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            aria-label="toggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {visibleTodos?.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {!!visibleTodos.length && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${isActiveTodos.length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: sortType === SortType.All,
                })}
                onClick={sortByAll}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: sortType === SortType.Active,
                })}
                onClick={sortByActive}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: sortType === SortType.Completed,
                })}
                onClick={sortByCompleted}
              >
                Completed
              </a>
            </nav>

            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <Notification
        isConnection={isConnection}
        title={title}
        isErrorMessage={isErrorMessage}
        closeErrorMessage={closeErrorMessage}
      />
    </div>
  );
};
