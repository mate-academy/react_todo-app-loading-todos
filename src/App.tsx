import React, { useState, useEffect, useContext } from 'react';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import {
  ErrorContext,
  LoadingContext,
  TodosContext,
} from './components/TodoContext';
import { Status } from './types/Status';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const { list, setList } = useContext(TodosContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [query, setQuery] = useState<Status>(Status.All);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setList)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
        setIsLoading(false);
      });
  }, [setErrorMessage, setIsLoading, setList]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Main query={query} />
        {list.length !== 0 && <Footer query={query} setQuery={setQuery} />}
      </div>

      <ErrorNotification />
    </div>
  );
};
