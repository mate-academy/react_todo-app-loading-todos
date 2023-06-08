/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterValues } from './components/constants';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { UserWarning } from './UserWarning';

const USER_ID = 10641;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState('');
  const [hasError, setHasError] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(FilterValues.ALL);

  const hasActive = todos.some(todoItem => !todoItem.completed);

  const filteredTodos = todos.filter(todo => {
    switch (selectedFilter) {
      case FilterValues.COMPLITED:
        return todo.completed;

      case FilterValues.ACTIVE:
        return !todo.completed;

      default: return true;
    }
  });

  const getTodosFromServer = async () => {
    try {
      const response = await getTodos(USER_ID);

      setTodos(response);
    } catch (error) {
      setHasError(true);
      setErrorType('upload');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasActive={hasActive} />

        {!!todos.length && (
          <>
            <TodoList
              todos={filteredTodos}
              setHasCompleted={setHasCompleted}
            />

            <Footer
              todos={todos}
              hasCompleted={hasCompleted}
              selectedFilter={selectedFilter}
              onChange={setSelectedFilter}
            />
          </>
        )}
      </div>
      {hasError && (
        <ErrorNotification
          errorType={errorType}
          onError={setHasError}
        />
      )}
    </div>
  );
};
