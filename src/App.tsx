import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

import { Todos } from './components/Todos/Todos';
import { Footer } from './components/Footer/Footer';
import { getFiltredTodos } from './components/Func/getFiltredTodos';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortField, setSortField] = useState(SortType.All);
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);

  const activeInput = useRef<HTMLInputElement>(null);

  const setErrorWithSetTimeout = (error: ErrorType) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorWithSetTimeout(ErrorType.UnableLoad);
      });
    activeInput.current?.focus();
  }, []);

  const sortedTodos = getFiltredTodos(todos, sortField);

  const everyTodosCompleted = todos.every(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${everyTodosCompleted && 'active'}`}
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              ref={activeInput}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <Todos todos={sortedTodos} />

        {!!todos.length && (
          <Footer
            todos={todos}
            sortField={sortField}
            setSortField={setSortField}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal
        ${!errorMessage && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
