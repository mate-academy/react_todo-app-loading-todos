/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterTypes';
import { Todo } from './types/Todo';
import { Notification } from './components/Notification';

const USER_ID = 6418;

export const getFilteredTodos = (
  todos: Todo[],
  filterBy: FilterType,
) => {
  let visibleTodos = [...todos];

  switch (filterBy) {
    case FilterType.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case FilterType.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    case FilterType.ALL:
    default:
      break;
  }

  return visibleTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(FilterType.ALL);

  const [hasLoadingError, sethasLoadingError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [isTodosLoaded, setIsTodosLoaded] = useState(false);

  const notify = (message: string) => {
    sethasLoadingError(true);
    setErrorMessage(message);

    setTimeout(() => {
      sethasLoadingError(false);
    }, 3000);
  };

  const getTodosFromServer = useCallback(async () => {
    sethasLoadingError(false);

    try {
      const fetchTodos = await getTodos(USER_ID);

      setTodos(fetchTodos);
      // setIsTodosLoaded(true);
    } catch {
      notify('Oppps smth went wrong with load todos...');
    } finally {
      // setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const handleFilterSelect = useCallback((filterType: FilterType) => {
    setSelectedFilter(filterType);
  }, []);

  const handleCloseNotification = useCallback(() => {
    sethasLoadingError(false);
  }, []);

  const visibleTodos = getFilteredTodos(todos, selectedFilter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${visibleTodos.length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={classnames('filter__link', {
                selected: selectedFilter === FilterType.ALL,
              })}
              onClick={() => {
                handleFilterSelect(FilterType.ALL);
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={classnames('filter__link', {
                selected: selectedFilter === FilterType.ACTIVE,
              })}
              onClick={() => {
                handleFilterSelect(FilterType.ACTIVE);
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classnames('filter__link', {
                selected: selectedFilter === FilterType.COMPLETED,
              })}
              onClick={() => {
                handleFilterSelect(FilterType.COMPLETED);
              }}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification
        message={errorMessage}
        onClose={handleCloseNotification}
        hidden={!hasLoadingError}
      />
    </div>
  );
};

// function useCallback(arg0: () => Promise<void>) {
//   throw new Error('Function not implemented.');
// }
