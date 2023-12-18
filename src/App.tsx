/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoFooter } from './components/footer/TodoFooter';
import { Errors } from './components/Errors/Errors';
import { TodoRenderList } from './components/main/TodoRenderList';
import { TodoHeader } from './components/header/Header';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { filterTodos } from './helpers/helper';
import { TypeOfFilter } from './types/TypeOfFilters';
import { Error } from './types/TypeOfErrors';

const USER_ID = 12049;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TypeOfFilter>(TypeOfFilter.All);
  const [error, setError] = useState<Error | null>(null);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filter);
  }, [todos, filter]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(Error.LoadTodos));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {!!todos.length && (
          <>
            <TodoRenderList todos={filteredTodos} />
            <TodoFooter
              todos={todos}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      <Errors
        error={error}
        setError={setError}
      />
    </div>
  );
};
