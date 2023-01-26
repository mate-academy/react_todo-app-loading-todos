/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { ErrorMessage } from './components/ErrorMessage';
import { TodosFilter } from './components/TodosFilter';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { ErrorType } from './types/ErrorType';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todosFromServer, setUsersFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.NONE);
  const [isError, setIsError] = useState(false);

  const onFilter = (filteredTodos: Todo[]) => {
    setVisibleTodos(filteredTodos);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

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

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
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
