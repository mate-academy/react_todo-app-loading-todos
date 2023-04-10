import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getTodos } from './api/todos';
import { filterTodos } from './components/helpers/helpers';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FilterTypes } from './types/FilterTypes';
import { ErrorMessage } from './components/ErrorMessage';

const USER_ID = 6962;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [filterType, setFilterType] = useState<FilterTypes>(FilterTypes.ALL);

  const fetchTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos && (
          <>
            <TodoList todos={filterTodos(todos, filterType)} />
            <Footer
              todos={todos}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}
      </div>

      {hasError && (
        <ErrorMessage setError={setHasError} />
      )}
    </div>
  );
};
