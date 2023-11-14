/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { UserWarning } from './UserWarning';

const USER_ID = 11604;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<Status>(Status.All);

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

  const filteredTodos = (todosFilter: Todo[], filterStatus: Status): Todo[] => {
    return todosFilter.filter(currentTodo => {
      switch (filterStatus) {
        case Status.Active:
          return !currentTodo.completed;
        case Status.Completed:
          return currentTodo.completed;
        default:
          return true;
      }
    });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = filteredTodos(todos, status);
  const handleFilterStatus = (todosStatus: Status) => (
    setStatus(todosStatus));

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
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

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

        <TodoList todos={visibleTodos} />

        {!!todos?.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} items left`}
            </span>

            <TodoFilter
              handleFilterStatus={handleFilterStatus}
              todosFilterStatus={status}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosCount === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
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
