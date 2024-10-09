/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { ErrorMessages } from './types/ErrorMessages';
import { FilterStatus } from './types/FilterStatus';
import { getFilteredTodos } from './helpers/helperFilter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(ErrorMessages.None);
  const [filter, setFilter] = useState(FilterStatus.All);

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    setErrorMessage(ErrorMessages.None);

    todoService
      .get()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessages.Load);
        setTimeout(() => {
          setErrorMessage(ErrorMessages.None);
        }, 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} onTodosChange={setTodos} />

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer todos={todos} filter={filter} onFilter={setFilter} />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};
