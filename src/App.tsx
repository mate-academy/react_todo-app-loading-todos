/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoMain } from './components/TodoMain/TodoMain';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { FilterContextProvider } from './context/FilterContext';
import { Notification } from './components/Notification/Notification';

const USER_ID = 9955;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(true);
      })
      .catch(() => setHasLoadingError(true));
    setIsLoading(false);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />
        <FilterContextProvider>
          <TodoMain
            todos={todos}
            isLoading={isLoading}
          />

          {todos.length > 0 && (
            <TodoFooter
              todos={todos}
            />
          )}
        </FilterContextProvider>
      </div>

      {hasLoadingError && (
        <Notification />
      )}
    </div>
  );
};
