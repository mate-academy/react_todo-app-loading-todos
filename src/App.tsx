/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useEffect, useState } from 'react';

import { getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { Errors } from './types/Errors';

import { UserWarning } from './UserWarning';

import { Header, TodoList, Footer, ErrorMessage } from './components';
import { FilterBy } from './types/FilterBy';
import { filterTodos } from './utils/FilterTodos';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterBy>(FilterBy.ALL);

  const filteredTodos = filterTodos(todos, selectedFilter);

  const handleCloseErrorButton = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(Errors.LOAD_ERROR));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={filteredTodos} />

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <Footer
            selectedFilter={selectedFilter}
            todos={todos}
            onSelectFilter={setSelectedFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage
        errorMessage={errorMessage}
        onHideErrors={handleCloseErrorButton}
      />
    </div>
  );
};
