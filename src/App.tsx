/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useState,
} from 'react';
import { getTodos } from './api/todos';
import { ErrorMessage } from './components/ErrorMessage';
import { TodosFilter } from './components/TodosFilter';
import { Header } from './components/Header';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { ErrorType } from './types/ErrorType';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const [todosFromServer, setUsersFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.NONE);
  const [isError, setIsError] = useState(false);

  const onFilter = useCallback(
    (filteredTodos: Todo[]) => {
      setVisibleTodos(filteredTodos);
    }, [visibleTodos],
  );

  useEffect(() => {
    getTodos((user as User).id)
      .then(result => {
        setUsersFromServer(result);
        setVisibleTodos(result);
      })
      .catch(() => {
        setErrorType(ErrorType.LOAD);
        setIsError(true);
      });
  }, []);

  const hideError = useCallback(
    () => {
      setIsError(false);
      setTimeout(() => {
        setErrorType(ErrorType.NONE);
      }, 1500);
    }, [],
  );

  useEffect(() => {
    if (errorType !== ErrorType.NONE) {
      setTimeout(() => {
        hideError();
      }, 3000);
    }
  }, [errorType]);

  const isTodos = todosFromServer.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header />

      <div className="todoapp__content">
        {isTodos && (
          <>
            <TodoList todosToShow={visibleTodos} />
            <TodosFilter
              usersTodos={todosFromServer}
              onFilter={onFilter}
            />
          </>
        )}
      </div>
      <ErrorMessage
        isError={isError}
        onHideError={hideError}
        errorType={errorType}
      />
    </div>
  );
};
