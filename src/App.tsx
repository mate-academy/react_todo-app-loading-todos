/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const USER_ID = 12084;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(
    () => {
      getTodos(USER_ID)
        .then((dataFromServer) => {
          setTodos(dataFromServer);
        })
        .catch((error) => {
          setErrorMessage(`Unable to load todos. Please try again. ${error}`);
        });
    }, [],
  );

  const todosToRender = useMemo(
    () => {
      return todos.filter(todo => {
        return filterValue === 'all'
          || (filterValue === 'completed'
            ? todo.completed
            : !todo.completed);
      });
    },
    [todos, filterValue],
  );

  const hideErrorMessage = () => {
    setErrorMessage(null);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          todos={todosToRender}
        />
        {todos.length > 0 && (
          <Footer
            todos={todosToRender}
            setFilterValue={setFilterValue}
            filterValue={filterValue}
          />
        )}
      </div>

      {errorMessage && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          {' '}
          {errorMessage}
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={hideErrorMessage}
          />
        </div>
      )}
    </div>
  );
};
