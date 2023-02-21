/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { ErrorType } from './types/ErrorType';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';
import { prepareTodos } from './utils/prepareTodos';

const USER_ID = 6396;

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.None);

  const fetchAllTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setHasError(true);
      setErrorType(ErrorType.Update);
      throw new Error('Error downloading todos');
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const handleError = (error: boolean) => {
    setHasError(error);
  };

  const handleInput = (input: string) => {
    setQuery(input);
  };

  const handleFilterType = (filter: FilterType) => {
    setFilterType(filter);
  };

  const visibleTodos = useMemo(() => (
    prepareTodos(todos, filterType)
  ), [todos, filterType]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header
          query={query}
          todos={todos}
          handleInput={handleInput}
        />

        {todos.length && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              todos={visibleTodos}
              filterType={filterType}
              handleFilterType={handleFilterType}
            />
          </>
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasError && (
        <Notification
          errorType={errorType}
          hasError={hasError}
          handleError={handleError}
        />
      )}
    </div>
  );
};
