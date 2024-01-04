/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import { FilterType } from './types/FooterFilter';
import { ErrorTitle } from './types/TodoErrors';

const USER_ID = 11847;

export const App: React.FC = () => {
  const [todos, setToodos] = useState<Todo[]>([]);
  const [viewTodos, setViewTodos] = useState<string>(FilterType.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => setToodos(data))
      .catch(() => setErrorMessage(ErrorTitle.Load));
  }, []);

  function filterTodo() {
    const todosFilter = todos.filter((todo) => {
      switch (viewTodos) {
        case FilterType.All:
          return todo;
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    return todosFilter;
  }

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  // console.log(todos);
  // console.log(viewTodos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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

        <TodoList todos={filterTodo()} setToodos={setToodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            setViewTodos={setViewTodos}
            viewTodos={viewTodos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger is-light',
          'has-text-weight-normal',
          {
            hidden: !errorMessage,
          }
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
