/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useCallback, useEffect, useState } from 'react';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Errors } from './types/Errors';

import { Header, TodoList, Footer, ErrorMessage } from './components';
import { FilterBy } from './types/FilterBy';
import { filterTodos } from './utils/FilterTodos';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterBy>(FilterBy.ALL);

  const filteredTodos = filterTodos(todos, selectedFilter);

  const handleRemoveError = () => {
    setErrorMessage(null);
  };

  const handleError = useCallback((error: Errors) => {
    setErrorMessage(error);

    setTimeout(handleRemoveError, 3000);
  }, []);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleError(Errors.LOAD_ERROR));
  }, [handleError]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={filteredTodos} />

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer
            selectedFilter={selectedFilter}
            todos={todos}
            onSelectFilter={setSelectedFilter}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        onClearError={handleRemoveError}
      />
    </div>
  );
};
