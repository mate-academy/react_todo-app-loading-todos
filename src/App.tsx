import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { getTodos } from './api/todos';
import { USER_ID } from './consts/consts';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { getFilteredTodos } from './helpers/getFilteredTodos';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.all);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(errorFromServer => setError(errorFromServer.message));
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (error) {
      timerId = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => clearTimeout(timerId);
  }, [error]);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filterStatus);
  }, [todos, filterStatus]);

  const isSomeActiveTodos = useMemo(() => {
    return todos.some(todo => !todo.completed);
  }, [todos]);

  const isSomeCompletedTodos = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const todosCount = todos.length;
  const isTodosVisible = todosCount > 0;

  const changeFilterStatus = useCallback((filterStaus: FilterStatus) => {
    setFilterStatus(filterStaus);
  }, []);

  const closeNotifications = useCallback(() => setError(null), []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isSomeActiveTodos={isSomeActiveTodos}
        />

        {isTodosVisible && (
          <>
            <TodoList
              todos={visibleTodos}
            />

            <Footer
              isSomeCompletedTodos={isSomeCompletedTodos}
              count={todosCount}
              filterStatus={filterStatus}
              onFilter={changeFilterStatus}
            />
          </>
        )}
      </div>

      {error && (
        <Notification
          error={error}
          onCloseNotifications={closeNotifications}
        />
      )}
    </div>
  );
};
