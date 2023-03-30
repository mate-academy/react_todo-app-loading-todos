import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { filterTodos } from './Helpers/helpers';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoErrorList } from './components/TodoErrorList';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { FilterParam } from './types/FilterParam';

const USER_ID = 6755;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [filterType, setFilterType] = useState<FilterParam>(FilterParam.All);

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
        <TodoErrorList setError={setHasError} />
      )}
    </div>
  );
};
