/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>(FilterType.ALL);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user?.id)
        .then((loadedTodos) => {
          setTodos(loadedTodos);
        })
        .catch(() => {
          setIsError(true);
          setErrorMessage('Something went wrong');
        });
    }
  }, [user]);

  const closeErrorMassage = useCallback(() => {
    setIsError(false);
  }, []);

  if (isError) {
    setTimeout(() => setIsError(false), 3000);
  }

  const visibleTodos = useMemo(() => todos.filter((todo) => {
    switch (filterStatus) {
      case FilterType.ACTIVE:
        return !todo.completed;

      case FilterType.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  }), [filterStatus, todos]);

  const amountOfItems = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        <TodoList todos={visibleTodos} />

        {Boolean(todos.length) && (
          <Footer
            filterStatus={filterStatus}
            onFilterChangeStatus={setFilterStatus}
            amountOfItems={amountOfItems}
          />
        )}
      </div>

      <ErrorNotification
        isError={isError}
        errorMessage={errorMessage}
        onCloseError={closeErrorMassage}
      />
    </div>
  );
};
