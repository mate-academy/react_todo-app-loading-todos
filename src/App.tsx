/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMassage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorType } from './types/ErrorType';
import { FilterField } from './types/FilterField';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { prepareTodos } from './utils/prepareTodos';

const USER_ID = 6372;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(ErrorType.NONE);
  const [isError, setIsError] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterField>(FilterField.ALL);

  const count = todos.length;

  const preparedTodos = prepareTodos(filterBy, todos);

  const isActive = useMemo(() => {
     return todos.filter(todo => !todo.completed)
  }, [todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(() => {
        setHasError(ErrorType.UPLOAD_ERROR);
        setIsError(true);
      });
  }, [USER_ID]);

  const errorClose = () => {
    setIsError(false);
  };

  const setFilterByField = (field: FilterField) => {
    setFilterBy(field);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          count={count}
          isActiveCount={isActive.length}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={preparedTodos}
            />

            <Footer
              filterBy={filterBy}
              isActiveCount={isActive.length}
              onSetFilterByField={setFilterByField}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {isError
        && (
          <ErrorMessage
            errorMassage={hasError}
            onErrorClose={errorClose}
            isError={isError}
          />
        )}
    </div>
  );
};
