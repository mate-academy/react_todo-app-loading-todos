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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState('upload');

  const USER_ID = 6381;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Error:', error);
        setHasError(true);
        setErrorType('upload');
      }
    };

    fetchTodo();
  }, []);

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos, filterType)
  ), [todos, filterType]);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const changeFilterType = useCallback((type: FilterType) => {
    setFilterType(type);
  }, []);

  const setError = useCallback((status: React.SetStateAction<boolean>) => {
    setHasError(status);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          activeTodos={activeTodos.length}
        />

        <TodoList todos={filteredTodos} />

        {todos.length !== 0 && (
          <Footer
            activeTodos={activeTodos.length}
            completedTodos={completedTodos.length}
            filterType={filterType}
            onFilterType={changeFilterType}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification
        errorType={errorType}
        hasError={hasError}
        onError={setError}
      />
    </div>
  );
};
