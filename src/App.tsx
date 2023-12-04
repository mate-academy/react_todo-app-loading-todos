/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';

import { UserWarning } from './components/UserWarning';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { DispatchContex, ErrorContext } from './utils/ErrorContext';

const USER_ID = 11993;

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todoList);
  const error = useContext(ErrorContext);
  const setError = useContext(DispatchContex);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodoList);
  }, []);

  useEffect(() => {
    setFilteredTodos(todoList);
  }, [todoList]);

  const hideError = () => {
    setError('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header todos={filteredTodos} />

        {todoList
          && (
            <>
              <Main todos={filteredTodos} />

              <Footer
                setFilteredTodos={setFilteredTodos}
                todos={todoList}
                setTodos={setTodoList}
              />
            </>
          )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />
        {error}
      </div>
    </div>
  );
};
