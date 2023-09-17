/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';

const USER_ID = 11414;

enum FilterMode {
  all,
  active,
  completed,
}

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>(FilterMode.all);

  const completedLength = allTodos.filter(toddo => toddo.completed).length;
  const countText = `${completedLength} items left`;
  const allClasses = classNames(
    'filter__link', { selected: filterMode === FilterMode.all },
  );
  const activeClasses = classNames(
    'filter__link', { selected: filterMode === FilterMode.active },
  );
  const completedClasses = classNames(
    'filter__link', { selected: filterMode === FilterMode.completed },
  );

  const handleClickButton = () => setErrorMessage('');

  const showError = (error: Error) => {
    setErrorMessage(error.message);
    setTimeout(handleClickButton, 3000);
  };

  const handleClickAll = () => {
    getTodos(USER_ID)
      .then((todos) => {
        setDisplayedTodos(todos);
        setAllTodos(todos);
        setErrorMessage('');
      })
      .catch((error: Error) => {
        showError(error);
      })
      .finally(() => setFilterMode(FilterMode.all));
  };

  const handleClickActive = () => {
    getTodos(USER_ID)
      .then(todos => {
        setAllTodos(todos);
        setDisplayedTodos(todos.filter(todo => !todo.completed));
        setErrorMessage('');
      })
      .catch((error: Error) => {
        showError(error);
      })
      .finally(() => setFilterMode(FilterMode.active));
  };

  const handleClickCompleted = () => {
    getTodos(USER_ID)
      .then(todos => {
        setAllTodos(todos);
        setDisplayedTodos(todos.filter(todo => todo.completed));
        setErrorMessage('');
      })
      .catch((error: Error) => {
        showError(error);
      })
      .finally(() => setFilterMode(FilterMode.completed));
  };

  useEffect(() => handleClickAll(), []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {allTodos.length > 0 && (
        <>
          <div className="todoapp__content">
            <TodoList todos={displayedTodos} />
          </div>

          <footer className="todoapp__footer">
            <span className="todo-count">
              {countText}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={allClasses}
                onClick={handleClickAll}
              >
                All
              </a>

              <a
                href="#/active"
                className={activeClasses}
                onClick={handleClickActive}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={completedClasses}
                onClick={handleClickCompleted}
              >
                Completed
              </a>
            </nav>
          </footer>
        </>
      )}

      {errorMessage && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={handleClickButton}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
