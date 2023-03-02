import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorType } from './types/ErrorType';
import { FilterBy } from './types/FilterBy';

const USER_ID = 6481;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorType.none);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filterBy, setFilterBy] = useState(FilterBy.all);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        setHasError(false);
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        setHasError(true);
        setErrorMessage(ErrorType.load);
      }
    };

    getTodosFromServer();
  }, []);

  const handleCloseError = () => {
    setHasError(false);
  };

  const allTodosCount = todos.length;

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.active:
          return !todo.completed;
        case FilterBy.completed:
          return todo.completed;
        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [filterBy, todos]);

  const handleFilterTodos = (status: FilterBy) => {
    setFilterBy(status);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!allTodosCount && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              allTodosCount={allTodosCount}
              activeTodosCount={activeTodosCount}
              filterBy={filterBy}
              onFilterTodos={handleFilterTodos}
            />
          </>
        )}
      </div>

      {hasError && (
        <ErrorNotification
          errorMessage={errorMessage}
          onCloseError={handleCloseError}
          hasError={hasError}
        />
      )}
    </div>
  );
};
