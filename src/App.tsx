import React, { useEffect, useState } from 'react';

import { USER_ID, getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { getPreparedTodos } from './utils/getPreparedTodos';

import { Todo } from './types/Todo';
import { ErrorMessages } from './types/ErrorMessages';
import { FilterOptions } from './types/FilterOptions';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
//eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Main } from './components/Main/Main';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.All,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.NoError,
  );

  const visibleTodos = getPreparedTodos(todos, filterOption);
  const activeTodos = todos.filter(todo => !todo.completed);
  const isSomeTodosCompleted = visibleTodos.some(todo => todo.completed);

  const handleFilter = (value: FilterOptions) => {
    setFilterOption(value);
  };

  const handleShowError = (message: ErrorMessages) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(ErrorMessages.NoError);
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleShowError(ErrorMessages.Load));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Main todos={visibleTodos} />
        {todos.length !== 0 && (
          <Footer
            counter={activeTodos.length}
            filterOption={filterOption}
            onFilter={handleFilter}
            isClearButtonShowing={isSomeTodosCompleted}
          />
        )}
      </div>

      <ErrorNotification
        message={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
