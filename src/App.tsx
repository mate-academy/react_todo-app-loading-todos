import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodosList } from './components/TodosList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterOptions } from './types/FilterOptions';
import { filteringTodos } from './utils/filteringTodos';
import { Notification } from './components/Notification';
import { Errors } from './types/Errors';
import { NotificationContext } from './context/NotificationContext';

const USER_ID = 10516;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    filterOption,
    setFilterOption,
  ] = useState<FilterOptions>(FilterOptions.All);
  const { errorMessage, setErrorMessage } = useContext(NotificationContext);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Errors.Loading));
  }, []);

  const currentTodos = useMemo(() => {
    return filteringTodos(todos, filterOption);
  }, [todos, filterOption]);

  const todosCountByStatus = useMemo(() => {
    return {
      active: filteringTodos(todos, FilterOptions.Active).length,
      completed: filteringTodos(todos, FilterOptions.Completed).length,
    };
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodosCount={todosCountByStatus.active} />

        {!!todos.length && (
          <>
            <TodosList todos={currentTodos} />
            <Footer
              todosCountByStatus={todosCountByStatus}
              filterOption={filterOption}
              setFilterOption={setFilterOption}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <Notification />
      )}
    </div>
  );
};
