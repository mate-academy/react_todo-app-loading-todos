/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { Todo } from './types/Todo';

import { UserWarning } from './components/UserWarning/UserWarning';
import { TodoList } from './components/TodoList/TodoList';

import { getTodos, USER_ID } from './api/todos';

type FilterBy = 'all' | 'active' | 'completed';

const ERROR_MESSAGE_DISAPPEARS_AFTER = 3000;

const getVisibleTodos = (todos: Todo[], filterBy: FilterBy) => {
  let visibleTodos = [...todos];

  switch (filterBy) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
  }

  return visibleTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage('');
    }, ERROR_MESSAGE_DISAPPEARS_AFTER);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getVisibleTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <footer className="todoapp__footer hidden" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.filter(todo => !todo.completed).length} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={cn('filter__link', {
                    selected: filterBy === 'all',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setFilterBy('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={cn('filter__link', {
                    selected: filterBy === 'active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => setFilterBy('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={cn('filter__link', {
                    selected: filterBy === 'completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilterBy('completed')}
                >
                  Completed
                </a>
              </nav>

              {/* this button should be disabled if there are no completed todos    */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
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
