/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';
import { Error } from './types/Error';
import { Header } from './components/Header';
import { TodosList } from './components/TodosList';
import { Footer } from './components/Footer';
import { ErrorNotifications } from './components/ErrorNotifications';

const USER_ID = 6335;

export const App: React.FC = () => {
  const [allTodos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setIsError(Error.Load);
        setTimeout(() => setIsError(null), 3000);
      });
  }, []);

  const filterHandler = (array: Todo[], filterType: string) => {
    switch (filterType) {
      case Filter.Active:
        return array.filter(item => !item.completed);
      case Filter.Completed:
        return array.filter(item => item.completed);
      default:
        return array;
    }
  };

  const activeTodos = filterHandler(allTodos, Filter.Active);
  const completedTodos = filterHandler(allTodos, Filter.Completed);
  const visibleTodos = filterHandler(allTodos, filter);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          allTodos={allTodos}
          activeTodos={activeTodos}
        />

        {!!allTodos.length && (
          <>
            <TodosList todos={visibleTodos} />

            <Footer
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      <ErrorNotifications
        isError={isError}
        setIsError={setIsError}
      />
    </div>
  );
};
