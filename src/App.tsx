import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';

export enum FilterStatus {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setError('');
    getTodos()
      .then(data => {
        setTodos(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Unable to load todos');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredTodos(
      filterStatus === FilterStatus.ACTIVE
        ? todos.filter(todo => !todo.completed)
        : filterStatus === FilterStatus.COMPLETED
          ? todos.filter(todo => todo.completed)
          : todos,
    );
  }, [filterStatus, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Header filteredTodos={filteredTodos} />
            {todos.length > 0 && (
              <>
                <TodoList filteredTodos={filteredTodos} />
                <Footer
                  setFilterStatus={setFilterStatus}
                  filterStatus={filterStatus}
                  filteredTodos={filteredTodos}
                  todos={todos}
                />
              </>
            )}
          </>
        )}
      </div>
      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
