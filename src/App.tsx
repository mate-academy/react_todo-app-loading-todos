import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Todo } from './types/Todo';

import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { getFilteredTodos } from './utils/filteredTodos';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(ErrorType.NO_ERROR);

  const USER_ID = 6381;

  useEffect(() => {
    const fetchTodos = async (userId: number) => {
      try {
        const todosFromServer = await getTodos(userId);

        setTodos(todosFromServer);
      } catch {
        setHasError(true);
        setError(ErrorType.UPLOAD_ERROR);
        // eslint-disable-next-line no-console
        console.warn('An occur error while load todos');
      }
    };

    fetchTodos(USER_ID);
  }, []);

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos, filterType)
  ), [todos, filterType]);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const changeFilterType = useCallback((type: FilterType) => {
    setFilterType(type);
  }, []);

  const changeError = useCallback((status: boolean) => {
    setHasError(status);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          hasTodos={todos.length}
          hasActiveTodos={activeTodos.length}
        />

        <TodoList todos={filteredTodos} />

        {todos.length !== 0 && (
          <Footer
            activeTodos={activeTodos.length}
            hasCompletedTodos={completedTodos.length}
            filterType={filterType}
            onFilterType={changeFilterType}
          />
        )}
      </div>

      <Notification
        error={error}
        hasError={hasError}
        changeError={changeError}
      />
    </div>
  );
};
