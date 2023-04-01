import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { useSort } from './utils/useSort';
import { Sort } from './types/Sort';

const USER_ID = 6771;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<boolean>(true);
  const [errorType, setErrorType] = useState<string>('');
  const [sortBy, setSortBy] = useState<Sort>(Sort.all);

  async function fetchTodos() {
    setIsError(false);
    try {
      const todosData = await getTodos(USER_ID);

      setTodos(todosData);
    } catch {
      setIsError(true);
      setErrorType('Error loading data');
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const sortedTodos = useSort(todos, sortBy);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={sortedTodos} />
        {sortedTodos.length > 0 && <TodoList todos={sortedTodos} />}
        {sortedTodos.length > 0 && <Footer setSort={setSortBy} sort={sortBy} />}
      </div>

      {isError
        && (
          <Error
            setIsError={setIsError}
            isError={isError}
            errorType={errorType}
          />
        )}
    </div>
  );
};
