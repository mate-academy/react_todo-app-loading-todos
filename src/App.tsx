/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Todo } from './types/Todo';
import { FilterTodos } from './types/FilterTodos';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

const USER_ID = 11500;

const filterTodos = (todos: Todo[], todosFilter: FilterTodos): Todo[] => {
  return todos.filter((todo: Todo) => {
    switch (todosFilter) {
      case FilterTodos.Completed:
        return todo.completed;
      case FilterTodos.Active:
        return !todo.completed;
      default:
        return true;
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<FilterTodos>(FilterTodos.All);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  const visibleTodos = filterTodos(todos, status);
  const handleFilterStatus = (todosFilter: FilterTodos) => (
    setStatus(todosFilter));

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {activeTodosCount > 0 && (
            <button
              type="button"
              data-cy="ToggleAllButton"
              className="todoapp__toggle-all active"
            />
          )}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList
          todos={visibleTodos}
        />
        {Boolean(todos.length) && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} items left`}
            </span>
            <TodoFilter
              handleFilterStatus={handleFilterStatus}
              todosFilterStatus={status}
            />
            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
              disabled={completedTodosCount === 0}
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
            hidden: !errorMessage,
          },
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
