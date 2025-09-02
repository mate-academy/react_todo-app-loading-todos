/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { ErrorNotifications } from './components/ErrorNotification';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isHiddenErrorMessage, setIsHiddenErrorMessage] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

  function loadTodos() {
    setLoading(true);

    getTodos()
      .then(todosApi => {
        setTodos(todosApi);
        setIsHiddenErrorMessage(true);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsHiddenErrorMessage(false);
        setTimeout(() => setIsHiddenErrorMessage(true), 3000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadTodos, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main
          loading={loading}
          filter={filter}
          todos={todos}
          filterTodos={setTodos}
        />

        <Footer todos={todos} filter={filter} stateFilter={setFilter} />
      </div>
      <ErrorNotifications
        errorMessage={errorMessage}
        isHiddenErrorMessage={isHiddenErrorMessage}
      />
    </div>
  );
};
