/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';
import { FilterBy } from './types/FilterBy';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.Create,
  );
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const activeTodosAmount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);
  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case FilterBy.Active:
        return todos.filter(todo => !todo.completed);
      case FilterBy.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterBy]);

  const hideError = () => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }

    setErrorMessage(ErrorMessage.Empty);
  };

  const showError = (message: ErrorMessage) => {
    setErrorMessage(message);

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }

    errorTimerRef.current = setTimeout(() => {
      setErrorMessage(ErrorMessage.Empty);
      errorTimerRef.current = null;
    }, 3000);
  };

  const handleSuccess = (loadedTodos: Todo[]) => {
    setTodos(loadedTodos);
  };

  const loadTodos = () => {
    setErrorMessage(ErrorMessage.Empty);

    todoService
      .getTodos()
      .then(handleSuccess)
      .catch(() => showError(ErrorMessage.Load));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {!!todos.length && (
          <Footer
            todos={todos}
            activeTodosAmount={activeTodosAmount}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} hideError={hideError} />
    </div>
  );
};
