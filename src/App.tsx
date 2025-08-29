/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import ErrorNotifacations from './components/errorNotifacations';
import Footer from './components/footer';
import TodoList from './components/todoList';
import Header from './components/header';
import { Todo } from './types/Todo';
import { filterData } from './helpers/filterData';

export const App: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<Todo[]>([]);
  const [renderedData, setRenderedData] = useState<Todo[]>([]);

  const [isError, setIsError] = useState('');
  const [filterTypeValue, setFilterTypeValue] = useState<string>('');

  const handleSetfilterType = (value: string) => {
    setFilterTypeValue(value);
  };

  useEffect(() => {
    setRenderedData(filterData(fetchedData, filterTypeValue));
  }, [fetchedData, filterTypeValue]);

  useEffect(() => {
    getTodos()
      .then(data => setFetchedData(data))
      .catch(() => {
        setIsError('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [isError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {fetchedData.length > 0 && (
          <>
            <TodoList renderedData={renderedData} />
            <Footer onSetfilterType={handleSetfilterType} />
          </>
        )}
      </div>

      <ErrorNotifacations isError={isError} />
    </div>
  );
};
