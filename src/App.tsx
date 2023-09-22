/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TContext, useTodoContext } from './components/TodoContext';
import { SortTypes, Todo } from './types/Todo';

const USER_ID = 11550;

export const App: React.FC = () => {
  const {
    todos,
    // addTodo,
    // hasError,
    // handleError,
    sortType,
    setSortType,
  } = useTodoContext() as TContext;
  const [timer, setTimer] = useState(false);
  const [errorVisible, setErrorVisible] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer(true);
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  const handleSorting = (type: string) => setSortType(type as SortTypes);

  const sortedTodos: {
    all: Todo[];
    completed: Todo[];
    active: Todo[];
  } = {
    all: todos || [],
    completed: (todos || []).filter((todo: Todo) => todo.completed),
    active: (todos || []).filter((todo: Todo) => !todo.completed),
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleHideError = () => {
    setErrorVisible(false);
  };

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
          <TodoForm />
        </header>

        <TodoList todos={sortedTodos[sortType]} />

        {/* Hide the footer if there are no todos */}
        {(todos.length > 0) && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todos.length}`}
              {' '}
              items left
              {/* items left */}
            </span>

            {/* Active filter should have a 'selected' class */}
            <TodoFilter sortType={sortType} handleSort={handleSorting} />

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
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
        className={(todos.length < 1)
          ? 'hiddenn'
          : 'notification is-danger is-light has-text-weight-normal'}
      >
        {((todos.length < 1) || !timer) && errorVisible && (
          <div
            className="hidden"
          >
            <button
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={handleHideError}
            />

            Unable to load todos
            {/* <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
          </div>
        )}
      </div>
    </div>
  );
};
