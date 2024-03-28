import React, { useState, useEffect, useContext } from 'react';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { ErrorContext, TodosContext } from './components/TodoContext';
import { Status } from './types/Status';
import classNames from 'classnames';

export const App: React.FC = () => {
  const { list, setList } = useContext(TodosContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const [query, setQuery] = useState<Status>(Status.All);

  useEffect(() => {
    getTodos()
      .then(setList)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, [setErrorMessage, setList]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Main query={query} />
        {list.length !== 0 && <Footer query={query} setQuery={setQuery} />}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
        {/* Unable to load todos
        Title should not be empty
        Unable to add a todo
        Unable to delete a todo
        Unable to update a todo */}
      </div>
    </div>
  );
};
