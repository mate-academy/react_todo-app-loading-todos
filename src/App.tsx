/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterByStatus } from './types/FilterByStatus';
import { PossibleError } from './types/PossibleError';
import { getTodos } from './api/todos';

const USER_ID = 6383;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredByStatus, setFilteredByStatus] = useState(FilterByStatus.All);
  const [possibleError, setPossibleError] = useState(PossibleError.None);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        setIsError(true);
        setPossibleError(PossibleError.Load);
      }
    };

    getTodosFromServer();
  }, []);

  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = todos.filter(todo => !todo.completed).length;

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filteredByStatus) {
        case FilterByStatus.All:
          return true;

        case FilterByStatus.Active:
          return !todo.completed;

        case FilterByStatus.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filteredByStatus]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header activeTodos={activeTodos} />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            filteredByStatus={filteredByStatus}
            setFilteredByStatus={setFilteredByStatus}
          />
        )}
      </div>

      <ErrorNotification
        possibleError={possibleError}
        isError={isError}
        onErrorNotificationClose={() => setIsError(false)}
      />
    </div>
  );
};
