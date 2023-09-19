import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Notification } from './components/Notification/Notification';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Status } from './enums/Status';

const USER_ID = 11444;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  // also hide the notification before any next request;
  const [filter, setFilter] = useState(Status.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(() => setError('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!todos.length && (
          <>
            <Main todos={todos} filter={filter} />
            <Footer
              todos={todos}
              filter={filter}
              updateFilter={(newFilter: Status) => setFilter(newFilter)}
            />
          </>
        )}

      </div>

      {error && (<Notification message={error} />)}

    </div>
  );
};
