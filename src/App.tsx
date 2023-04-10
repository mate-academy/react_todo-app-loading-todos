/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { ToodList } from './components/TodoList/TodoList';
import { getTodos } from './api/todos';
import { Loader } from './components/Loader';
import { FilterType } from './types/FilterEnum';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

const USER_ID = 7006;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHiddenNotification, setIsHiddenNotification] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(FilterType.All);

  const activeTodos = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        setIsLoading(true);
        setIsError('');
        setIsHiddenNotification(true);
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        if (error instanceof Error) {
          setIsHiddenNotification(false);
          setIsError(error.message);
          setTimeout(setIsHiddenNotification, 3000, [true]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getTodosFromServer();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {isLoading && (
        <Loader />
      )}

      <Header />

      <div className="todoapp__content">
        {todos.length > 0 && (
          <ToodList todos={todos} filter={selectedFilter} />
        )}

        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
            completedTodos={todos.length - activeTodos}
          />
        )}
      </div>

      <Notification
        isError={isError}
        onChangeStatus={() => setIsHiddenNotification}
        isHiddenNotification={isHiddenNotification}
      />
    </div>
  );
};
