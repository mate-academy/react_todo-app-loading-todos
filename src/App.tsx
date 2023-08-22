/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11359;

export const App: React.FC = () => {
  const [myTodos, setMyTodos] = useState<Todo[]>([]);
  const [closeError, setCloseError] = useState(false);
  const [errorMassege, setErrorMassege] = useState('');
  const [query, setQuery] = useState('All');

  function hideError() {
    setTimeout(() => setCloseError(true), 3000);
  }

  useEffect(() => {
    setCloseError(true);
    getTodos(USER_ID)
      .then(setMyTodos)
      .catch(() => {
        setErrorMassege('unable to load todos');
        setCloseError(false);
        hideError();
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function filterTodos(param: string) {
    switch (param) {
      case 'Active': {
        const activeTodos = myTodos.filter(todo => !todo.completed);

        return activeTodos;
      }

      case 'Completed': {
        const completedTodos = myTodos.filter(todo => todo.completed);

        return completedTodos;
      }

      default:
        return myTodos;
    }
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Main todos={filterTodos(query)} />

        {myTodos.length !== 0 && <Footer changeQuery={setQuery} />}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMassege && (
        <div
          className={`notification is-danger
                   is-light
                   has-text-weight-normal
                   ${closeError && 'hidden'}`}
        >
          <button
            onClick={() => setCloseError(true)}
            type="button"
            className="delete"
          />

          {/* show only one message at a time */}
          {errorMassege}
        </div>
      )}
    </div>
  );
};
