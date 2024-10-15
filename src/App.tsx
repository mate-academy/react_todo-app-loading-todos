import React, { useEffect, useMemo, useState } from 'react';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ToodoList } from './components/TodoList';
import { FilterOptions } from './utils/FilterOptions';

import { getFilteredTodos } from './utils/GetFilteredTodos';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessages } from './types/ErrorMessages';
import { Header } from './components/Header';
import { handleError } from './utils/HandleError';

export const App: React.FC = () => {
  const [todoos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessages>(ErrorMessages.None);
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.All,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleError(setError, ErrorMessages.LoadFail));
  }, []);

  const numberOfActiveTodos = useMemo(() => {
    return todoos.filter(todo => !todo.completed).length;
  }, [todoos]);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todoos, filterOption);
  }, [todoos, filterOption]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!todoos.length && (
          <>
            <ToodoList todos={filteredTodos} />
            <Footer
              setFilterOption={setFilterOption}
              filterOption={filterOption}
              numberOfActiveTodos={numberOfActiveTodos}
            />
          </>
        )}
      </div>

      <ErrorNotification error={error} />
    </div>
  );
};
