/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { request } from './utils/fetchClient';
import { Todo, TodoStatus } from './types/Todo';
import { ErrorNotification } from './ErrorNotification';
import { TodosMain } from './TodosMain';
import { TodosHeader } from './TodosHeader';
import { TodosFooter } from './TodosFooter';

const USER_ID = 10332;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [statusFileter, setStatusFilter] = useState<
  TodoStatus.All
  | TodoStatus.Completed
  | TodoStatus.Uncompleted
  >(TodoStatus.All);

  const loadTodos = async () => {
    try {
      const response = await request<Todo[]>('/todos?userId=10332');

      setTodos([...todos, ...response]);
    } catch {
      setError('server response error');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleStatusFilter = useCallback(
    (status: TodoStatus.All
    | TodoStatus.Completed
    | TodoStatus.Uncompleted) => {
      setStatusFilter(status);
    }, [],
  );

  let preparedTodos = todos;

  if (statusFileter) {
    preparedTodos = preparedTodos.filter(todo => {
      switch (statusFileter) {
        case TodoStatus.Uncompleted:
          return !todo.completed;
        case TodoStatus.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  const completedTodosLength = preparedTodos
    .filter(todo => todo.completed).length;

  const uncompletedTodosLength = preparedTodos
    .filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader
          uncompletedTodosLength={uncompletedTodosLength}
        />

        <TodosMain
          todos={preparedTodos}
        />

        {todos && (
          <TodosFooter
            onStatusFilter={handleStatusFilter}
            todosQuantity={todos.length}
            statusFileter={statusFileter}
            completedTodosLength={completedTodosLength}
          />
        )}
      </div>

      {error && (
        <ErrorNotification
          error={error}
        />
      )}
    </div>
  );
};
