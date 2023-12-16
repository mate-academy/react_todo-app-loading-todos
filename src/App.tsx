/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';

import { getTodos } from './api/todos';

import { UserWarning } from './components/UserWarning/UserWarning';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotification';

import type { Todo } from './types/Todo';
import { StatusFilter } from './types/StatusFilter';
import { ErrorMessage } from './types/ErrorMessage';

const USER_ID = 12039;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [statusFilter, setStatusFilter] = useState(StatusFilter.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.LOAD_ERROR);
        setTimeout(() => setErrorMessage(null), 3000);
      });
  }, []);

  const todosToRender = useMemo(() => todos.filter(todo => {
    switch (statusFilter) {
      case StatusFilter.ACTIVE:
        return !todo.completed;

      case StatusFilter.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  }), [todos, statusFilter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length !== 0 && (
          <>
            <TodoList todos={todosToRender} />

            <Footer
              todos={todos}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onHide={() => setErrorMessage(null)}
      />
    </div>
  );
};
