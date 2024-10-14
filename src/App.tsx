import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';

import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotifications } from './components/Errors';

import { Todo } from './types/Todo';
import { Errors } from './types/ErrorsEnum';
import { Filter } from './types/FilterEnum';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.ALL);
  const [errorNotification, setErrorNotification] = useState<Errors>(
    Errors.DEFAULT,
  );

  useEffect(() => {
    setErrorNotification(Errors.DEFAULT);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorNotification(Errors.LOADING);
      });
    setTimeout(() => {
      setErrorNotification(Errors.DEFAULT);
    }, 3000);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!todos.length && (
          <>
            <TodoList todos={todos} filter={filter} />

            <Footer onFilterChange={setFilter} filter={filter} todos={todos} />
          </>
        )}
      </div>

      <ErrorNotifications
        errorNotification={errorNotification}
        setErrorNotification={setErrorNotification}
      />
    </div>
  );
};
