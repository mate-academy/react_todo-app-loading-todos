import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { ErrNotification } from './Component/ErrNotification/ErrNotification';
import { Footer } from './Component/Footer/Footer';
import { Header } from './Component/Header/Header';
import { TodoList } from './Component/TodoList/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorType } from './types/ErrorType';
import { FilterBy } from './types/FilterBy';

const USER_ID = 11091;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [activeTodosCount, setActiveTodosCount] = useState(0);
  const [complitedTodosCount, setComplitedTodosCount] = useState(0);

  const [filterValue, setFilterValue] = useState(FilterBy.ALL);

  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const loadTodos = async () => {
    setErrorMessage(null);
    setIsHidden(false);
    setIsLoading(true);
    try {
      const loadedTodos = await getTodos(USER_ID);

      setTodos(loadedTodos);
    } catch {
      setErrorMessage(ErrorType.LOAD);
      setTimeout(() => {
        setIsHidden(true);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const activeTodos = todos.filter(({ completed }) => !completed);
    const complitedTodos = todos.filter(({ completed }) => completed);

    setActiveTodosCount(activeTodos.length);
    setComplitedTodosCount(complitedTodos.length);

    switch (filterValue) {
      case FilterBy.ACTIVE:
        setVisibleTodos(activeTodos);
        break;
      case FilterBy.COMPLETED:
        setVisibleTodos(complitedTodos);
        break;
      default:
        setVisibleTodos(todos);
        break;
    }
  }, [todos, filterValue]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          activeTodosCount={activeTodosCount}
        />
        {visibleTodos.length > 0 && (
          <TodoList
            visibleTodos={visibleTodos}
            isLoading={isLoading}
          />
        )}
        {todos.length > 0 && (
          <Footer
            filterValue={filterValue}
            activeTodosCount={activeTodosCount}
            complitedTodosCount={complitedTodosCount}
            setFilterValue={setFilterValue}
          />
        )}
      </div>
      {errorMessage && (
        <ErrNotification
          errorMessage={errorMessage}
          isHidden={isHidden}
          onCloseError={setErrorMessage}
        />
      )}
    </div>
  );
};
