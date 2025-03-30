/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer'; // Import the new Footer component
import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';
import { filter, FilterType } from './utils/filter';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [shownTodos, setShownTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.ALL);

  useEffect(() => {
    getTodos()
      .then(todos => setTodosFromServer(todos))
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(
    () => setShownTodos(filter(todosFromServer, filterType)),
    [todosFromServer, filterType],
  );

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(null), 3000);
    }
  }, [errorMessage]);

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
            className={`todoapp__toggle-all ${shownTodos.every(todo => todo.completed) && 'active'}`}
            data-cy="ToggleAllButton"
            title="ToggleAllButton"
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

        <TodoList todos={shownTodos} />

        {/* Use the extracted Footer component */}
        {/* Hide the footer if there are no todos */}
        {todosFromServer.length !== 0 && (
          <Footer
            shownTodos={shownTodos}
            filterType={filterType}
            setFilterType={setFilterType}
            counter={todosFromServer.filter(todo => !todo.completed).length}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!!!errorMessage && 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          title="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
