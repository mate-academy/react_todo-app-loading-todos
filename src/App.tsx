import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { TodosError } from './components/TodosError/TodosError';
import { TodosFooter } from './components/TodosFooter/TodosFooter';
import { TodosHeader } from './components/TodosHeader/TodosHeader';
import { TodosList } from './components/TodosList/TodosList';
import { getVisibleTodos } from './helpers/GetVisibleTodos';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { Error } from './types/Error';
import { UserWarning } from './UserWarning';

const USER_ID = 11331;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [error, setError] = useState(Error.Unknown);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setError(Error.Download);
      });
  }, []);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, filter)
  ), [todos, filter]);

  const activeTodosCount = useMemo(() => (
    getVisibleTodos(todos, Filter.Active).length
  ), [todos]);

  const isAnyTodos = todos.length > 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader />

        {isAnyTodos && <TodosList todos={visibleTodos} />}

        { isAnyTodos
          && (
            <TodosFooter
              todosCount={activeTodosCount}
              onFilter={setFilter}
              filter={filter}
            />
          )}
      </div>

      { error
        && (
          <TodosError
            errorMessage={error}
            onError={setError}
          />
        )}
    </div>
  );
};
