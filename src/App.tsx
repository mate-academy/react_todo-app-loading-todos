/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Content } from './components/Content/Content';
import { Notification } from './components/Notification/Notification';

const USER_ID = 10888;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAnyError, setIsAnyError] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [filterCondition, setFilterCondition] = useState('all');

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

  const filteredTodos: Todo[] = useMemo(() => {
    return todos.filter(todo => {
      switch (filterCondition) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, filterCondition]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Content
        todos={filteredTodos}
        filter={filterCondition}
        onFilterChange={setFilterCondition}
      />

      {isAnyError && (
        <Notification
          error={isErrorMessage}
          onHandleError={setIsErrorMessage}
        />
      )}
    </div>
  );
};
