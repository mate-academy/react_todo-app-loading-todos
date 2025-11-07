/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { Todo } from './types/Todo';
import { Status } from './types/StatusEnum';
import { TodoMain } from './components/TodoMain';
import { ErrorMessage } from './components/ErrorMessage';
import { TodoFooter } from './components/TodoFooter';
import { ErrorType } from './types/ErrorEnum';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoader] = useState(false);
  const [status, setStatus] = useState(Status.All);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  useEffect(() => {
    setLoader(true);

    const loadData = async () => {
      try {
        const loadedData = await getTodos();

        setTodos(loadedData);
      } catch (error) {
        setErrorType(ErrorType.Load);
      } finally {
        setLoader(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (errorType !== null) {
      const timer = setTimeout(() => {
        setErrorType(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [errorType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const getPreparedTodos = (todosToPrepare: Todo[], settedStatus: Status) => {
    let preparedTodos = [...todosToPrepare];

    if (settedStatus !== Status.All) {
      preparedTodos = preparedTodos.filter(todo => {
        switch (settedStatus) {
          case Status.Active:
            return !todo.completed;

          case Status.Completed:
            return todo.completed;

          default:
            return new Error('unknown Status has been selected!');
        }
      });
    }

    return preparedTodos;
  };

  const handleSwitchStatus = (selectedStatus: Status) => {
    setStatus(selectedStatus);
  };

  const handleCloseError = () => {
    setErrorType(null);
  };

  const visibleTodos: Todo[] = getPreparedTodos(todos, status);
  const activeTodos = todos.filter(todo => todo.completed === false);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />
        <TodoMain visibleTodos={visibleTodos} isLoading={isLoading} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <TodoFooter
            status={status}
            activeTodos={activeTodos}
            onSwitch={handleSwitchStatus}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage errorToShow={errorType} onCloseBtn={handleCloseError} />
    </div>
  );
};
