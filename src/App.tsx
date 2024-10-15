/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotifications';
import { Errors } from './types/Errors';
import { FilterStatus } from './types/FilterStatus';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodods] = useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState(Errors.DEFAULT);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.ALL);

  const handleResetErrorMessage = () => {
    setErrorMessage(Errors.DEFAULT);
  };

  useEffect(() => {
    setErrorMessage(Errors.DEFAULT);

    getTodos()
      .then(setTodods)
      .catch(() => setErrorMessage(Errors.LOADING_TODOS));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = getFilteredTodos(todos, filterStatus);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              todos={todos}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        handleResetErrorMessage={handleResetErrorMessage}
      />
    </div>
  );
};
