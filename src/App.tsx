/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { Todo } from './types/Todo';
import { TodoInfo } from './components/TodoInfo/TodoInfo';
import { Footer } from './components/Footer/Footer';
import { getTodos } from './api/todos';
import { Status, ErrorType } from './enums/enums';

const USER_ID = 10326;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState(ErrorType.None);
  const [isErrorNotification, setIsErrorNotification] = useState(false);
  const [status, setStatus] = useState<Status>(Status.All);

  const isError = errorType !== ErrorType.None;

  const setError = (typeOfError: ErrorType) => {
    setErrorType(typeOfError);
    setTimeout(() => setErrorType(ErrorType.None), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getTodos(USER_ID);
        const todosFromServer = responce;

        setError(ErrorType.None);
        setTodos(todosFromServer);
      } catch (error) {
        setError(ErrorType.Add);
        Promise.reject();
      }
    };

    fetchData();
  }, []);

  const errorMessage = useCallback(() => {
    switch (errorType) {
      case ErrorType.Add:
        return 'Unable to add a todo';

      case ErrorType.Delete:
        return 'Unable to delete a todo';

      case ErrorType.Update:
        return 'Unable to update a todo';

      default:
        return 'Something wrong';
    }
  }, [errorType]);

  const filterTodos = (filter: Status) => {
    switch (filter) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const visibleTodos = filterTodos(status);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {todos.length !== 0 && (
          <>
            <section className="todoapp__main">
              {visibleTodos.map(todo => (
                <TodoInfo
                  key={todo.id}
                  todo={todo}
                />
              ))}
            </section>

            <Footer
              status={status}
              setStatus={setStatus}
              todos={todos}
            />
          </>
        )}
      </div>

      {isError && (
        <div className={classNames(
          'notification', 'is-danger', 'is-light', 'has-text-weight-normal', {
            hidden: isErrorNotification,
          },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setIsErrorNotification(true)}
          />

          {errorMessage()}
        </div>
      )}
    </div>
  );
};
