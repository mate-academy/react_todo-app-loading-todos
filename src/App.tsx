/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { ErrorMessages } from './types/Errors';
import { TodoStatusFilter } from './types/TodoStatusFilter';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

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
  const [filterStatus, setFilterStatus] = useState<TodoStatusFilter>(
    TodoStatusFilter.All,
  );

  const getFilteredTodos = useCallback(
    (allTodos: Todo[], status: TodoStatusFilter) => {
      let filteredTodos = [...allTodos];

      if (status) {
        filteredTodos =
          status === TodoStatusFilter.Completed
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

      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
