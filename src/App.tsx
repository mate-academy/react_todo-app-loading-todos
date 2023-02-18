/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useCallback, useEffect } from 'react';

// components
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessages';

// utils for loading
import { getTodos } from './api/todos';

// utils
import { getFilteredTodos } from './utils/getFilteredTodos';

// types
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

const USER_ID = 6354;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);

  const getAllTodos = useCallback(async () => {
    setIsLoadingFailed(false);

    try {
      const allTodos = await getTodos(USER_ID);

      setTodos(allTodos);
    } catch {
      setIsLoadingFailed(true);
      setErrorMessage('Unable to update a todo');
    }
  }, []);

  useEffect(() => {
    getAllTodos();
  }, []);

  const visibleTodos = getFilteredTodos(todos, filterBy);

  const clearMessage = useCallback(() => {
    setErrorMessage('');
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {!isLoadingFailed && (
          <>
            <Header />

            <TodoList todos={visibleTodos} />
          </>
        )}

        <Footer
          setFilterBy={setFilterBy}
          filterBy={filterBy}
        />
      </div>

      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          setMessage={clearMessage}
        />
      )}
    </div>
  );
};
