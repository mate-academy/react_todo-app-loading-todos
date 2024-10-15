/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { Header, Footer, Notification, TodoList } from './components';
import { getTodos } from './api/todos';
import { FilterOption, Todo, Error } from './types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Error>(Error.DEFAULT);
  const [filterOption, setFilterOption] = useState<FilterOption>(
    FilterOption.all,
  );

  const todosAmount = useMemo(() => todos.length, [todos]);
  const uncompletedTodosAmount = useMemo(
    () => todos.reduce((amount, todo) => amount + (todo.completed ? 0 : 1), 0),
    [todos],
  );

  const handleResetError = () => setError(Error.DEFAULT);

  const handleError = (message: Error) => {
    setError(message);

    setTimeout(handleResetError, 3000);
  };

  useEffect(() => {
    handleResetError();

    getTodos()
      .then(currentTodos => {
        setTodos(currentTodos);
      })
      .catch(() => {
        handleError(Error.LOADING_TODOS);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todosAmount={todosAmount}
          uncompletedTodosAmount={uncompletedTodosAmount}
        />

        {!!todosAmount && (
          <>
            <TodoList todos={todos} filterOption={filterOption} />

            <Footer
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              todosAmount={todosAmount}
              uncompletedTodosAmount={uncompletedTodosAmount}
            />
          </>
        )}
      </div>

      <Notification error={error} onReset={handleResetError} />
    </div>
  );
};
