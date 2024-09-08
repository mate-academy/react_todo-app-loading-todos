/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { ErrorMessages } from './types/Errors';
import { FilterStatus } from './types/FilterStatus';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  // #region todos and errors
  const [todos, setTodos] = useState<Todo[]>([]);
  const sortedTodos = useMemo(
    () => ({
      active: todos.filter(todo => !todo.completed),
      completed: todos.filter(todo => todo.completed),
    }),
    [todos],
  );

  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.None,
  );
  // #endregion

  // #region filterStatus and  filter handling
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const getFilteredTodos = useCallback(
    (allTodos: Todo[], status: FilterStatus) => {
      let filteredTodos = [...allTodos];

      if (status) {
        filteredTodos =
          status === FilterStatus.Completed
            ? sortedTodos.completed
            : sortedTodos.active;
      }

      return filteredTodos;
    },
    [sortedTodos],
  );

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filterStatus),
    [getFilteredTodos, todos, filterStatus],
  );
  // #endregion

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessages.Loading);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} onToggle={setTodos} />

        <TodoList todos={filteredTodos} onTodosChange={setTodos} />

        {!!todos.length && (
          <Footer
            sortedTodos={sortedTodos}
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
            onTodosChange={setTodos}
          />
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
