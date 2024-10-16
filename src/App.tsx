import React, { useEffect, useMemo, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Errors } from './types/Errors';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import { UserWarning } from './UserWarning';
import { handleError } from './utils/handleError';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.Default);
  const [filterOption, setFilterOption] = useState<Filter>(Filter.All);

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .catch(() => handleError(setErrorMessage, Errors.Loading));
  }, []);

  const uncompletedTodosAmount = useMemo(() => {
    return todosFromServer.filter(todo => !todo.completed).length;
  }, [todosFromServer]);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todosFromServer, filterOption);
  }, [todosFromServer, filterOption]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          uncompletedTodosAmount={uncompletedTodosAmount}
          todosLength={todosFromServer.length}
        />

        <TodoList todos={filteredTodos} />

        {!!todosFromServer.length && (
          <Footer
            filterOption={filterOption}
            uncompletedTodosAmount={uncompletedTodosAmount}
            setFilterOption={setFilterOption}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
