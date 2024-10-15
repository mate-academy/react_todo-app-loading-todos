/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { ErrorMessages } from './types/ErrorMessages';
import { FilterOptions } from './types/FilterOptions';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.DEFAULT,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.NO_ERROR,
  );

  const handleErrorReset = () => {
    setErrorMessage(ErrorMessages.NO_ERROR);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessages.UNABLE_TO_LOAD_TODO);
        setTimeout(handleErrorReset, 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />
        <TodoList todos={todos} filterOption={filterOption} />

        {todos.length && (
          <Footer
            todos={todos}
            currentFilter={filterOption}
            onFilterOptionChange={setFilterOption}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onResetError={handleErrorReset}
      />
    </div>
  );
};
