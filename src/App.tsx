import React, { useEffect, useState } from 'react';

import { USER_ID, getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { ErrorMessages } from './types/ErrorMessages';
import { FilterOptions } from './types/FilterOptions';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Errors } from './components/Errors/Errors';
import { Main } from './components/Main/Main';
import { UserWarning } from './UserWarning';

const getPreparedTodos = (todos: Todo[], filterOption: FilterOptions) => {
  let preparedTodos = todos;

  switch (filterOption) {
    case FilterOptions.Active:
      return (preparedTodos = todos.filter(todo => !todo.completed));
    case FilterOptions.Completed:
      return (preparedTodos = todos.filter(todo => todo.completed));
    default:
      return preparedTodos;
  }
};

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.All,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.noError,
  );

  const visibleTodos = getPreparedTodos(todos, filterOption);
  const activeTodos = todos.filter(todo => !todo.completed);
  const isSomeTodosCompleted = visibleTodos.some(todo => todo.completed);

  const handleFilter = (value: FilterOptions) => {
    setFilterOption(value);
  };

  const handleRemoveError = () => {
    setTimeout(() => setErrorMessage(ErrorMessages.noError), 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessages.cantLoadTodos));
    handleRemoveError();
  }, []);

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

      <Errors message={errorMessage} onRemoveError={handleRemoveError} />
    </div>
  );
};
