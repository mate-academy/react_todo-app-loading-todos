/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      getTodos(user?.id)
        .then(setTodos)
        .catch(() => {
          setHasError(true);
          setErrorMessage('Can\'t load todos');
        });
    }
  });

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.All:
          return todo;

        case FilterType.Active:
          return !todo.completed;

        case FilterType.Completed:
          return todo.completed;

        default:
          throw new Error('Invalid type');
      }
    });
  }, [todos, filterType]);

  const countOfActiveTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const hasCompletedTodos = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  if (hasError) {
    setTimeout(() => setHasError(false), 3000);
  }

  const handleCloseErrorMessage = () => {
    setHasError(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              activeTodos={countOfActiveTodos}
              hasCompletedTodos={hasCompletedTodos}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}
      </div>

      <ErrorNotification
        hasError={hasError}
        setHasError={handleCloseErrorMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};
