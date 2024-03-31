import React, { useState, useEffect, useContext } from 'react';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { TodosContext } from './components/TodoContext';
import { Status } from './types/Status';
import { ErrorNotification } from './components/ErrorNotification';
import { UserWarning } from './UserWarning';

export const App: React.FC = () => {
  const { list, setList, setErrorMessage } = useContext(TodosContext);
  const [query, setQuery] = useState<Status>(Status.All);

  useEffect(() => {
    getTodos()
      .then(setList)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, [setErrorMessage, setList]);

  return USER_ID ? (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList query={query} />
        {list.length !== 0 && <Footer query={query} setQuery={setQuery} />}
      </div>

      <ErrorNotification />
    </div>
  ) : (
    <UserWarning />
  );
};
