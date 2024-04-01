/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { USER_ID, getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoAppMain } from './components/TodoAppMain';
import { TodoAppFooter } from './components/TodoAppFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { ErrorText } from './types/ErrorText';
import { StatusFilter } from './types/StatusFilter';
import { wait } from './utils/fetchClient';

const getFilteredTodos = (
  todos: Todo[],
  statusFilter: StatusFilter,
): Todo[] => {
  switch (statusFilter) {
    case StatusFilter.All:
      return todos;
    case StatusFilter.Active:
      return todos.filter(todo => !todo.completed);
    case StatusFilter.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorText, setErrorText] = useState<ErrorText>(ErrorText.NoError);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.All,
  );

  useEffect(() => {
    getTodos().then(
      data => {
        wait(150).then(() => setTodos(data));
      },
      () => {
        setErrorText(ErrorText.Loading);
        wait(3000).then(() => setErrorText(ErrorText.NoError));
      },
    );
  }, []);

  const preparedTodos = getFilteredTodos(todos, statusFilter);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleStatusFilterClick = (statusFilterValue: StatusFilter) => {
    setStatusFilter(statusFilterValue);
  };

  const handleHideError = () => {
    setErrorText(ErrorText.NoError);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader />

        <TodoAppMain todos={preparedTodos} />
        {/* Hide the footer if there are no todos */}

        {!!todos.length && (
          <TodoAppFooter
            onStatusFilterClick={handleStatusFilterClick}
            todos={todos}
            statusFilter={statusFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification errorText={errorText} onHideError={handleHideError} />
    </div>
  );
};
