/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import classNames from 'classnames';
import * as todoService from './api/todos';

import { TodoList } from './components/ToDoList';

import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';

import { Footer } from './components/Footer';

import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.NONE);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const errorTimerId = useRef(0);

  const showError = (message: string) => {
    setError(message);
    window.clearTimeout(errorTimerId.current);
    errorTimerId.current = window.setTimeout(() => {
      setError('');
    }, 3000);
  };

  useEffect(() => {
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessage.LOAD_ERROR));
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const onFilterChange = (filt: FilterType) => {
    setFilter(filt);
  };

  const todosCounter = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

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
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {todos.length !== 0 && <TodoList todos={filteredTodos} />}
        {todos.length !== 0 && (
          <Footer
            filter={filter}
            todosCounter={todosCounter}
            onFilterChange={onFilterChange}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: error === ErrorMessage.NONE },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {error}
      </div>
    </div>
  );
};
