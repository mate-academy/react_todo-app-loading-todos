/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoContent } from './components/Content/TodoContent';
import { ErrorNotification } from './components/Notification/ErrorNotification';
import { FilterStatus } from './helper';

const USER_ID = 10888;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAnyError, setIsAnyError] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [filterCondition, setFilterCondition] = useState(FilterStatus.ALL);

  useEffect(() => {
    const loadTodosByUser = async (userID: number) => {
      try {
        const uploadedTodos = await getTodos(userID);

        setTodos(uploadedTodos);
      } catch (error) {
        setIsAnyError(true);
        setIsErrorMessage(true);
        throw new Error('erroooooor');
      }
    };

    loadTodosByUser(USER_ID);

    const timeout = setTimeout(() => {
      setIsErrorMessage(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const activeTodosQuantity = todos.filter(todo => !todo.completed).length;

  const filteredTodos: Todo[] = useMemo(() => {
    return todos.filter(todo => {
      switch (filterCondition) {
        case FilterStatus.ALL:
          return todo;
        case FilterStatus.ACTIVE:
          return !todo.completed;
        case FilterStatus.COMPLETED:
          return todo.completed;
        default:
          return 0;
      }
    });
  }, [todos, filterCondition]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent
        todos={filteredTodos}
        activeTodosQuantity={activeTodosQuantity}
        filter={filterCondition}
        onFilterChange={setFilterCondition}
      />

      {isAnyError && (
        <ErrorNotification
          error={isErrorMessage}
          onHandleError={setIsErrorMessage}
        />
      )}
    </div>
  );
};
