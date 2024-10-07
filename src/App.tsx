import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { Filter } from './FilterEnum';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [isNotificationHidden, setIsNotificationHidden] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsNotificationHidden(false);

        setTimeout(() => {
          setErrorMessage('');
          setIsNotificationHidden(true);
        }, 3000);
      });
  }, []);

  const filterTodos = useCallback((todos: Todo[], filterBy: Filter): Todo[] => {
    switch (filterBy) {
      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  }, []);

  const visibleTodos = useMemo(
    () => filterTodos(todosFromServer, filter),
    [filterTodos, todosFromServer, filter],
  );

  const activeTodosCount = useMemo(
    () => todosFromServer.filter(todo => !todo.completed).length,
    [todosFromServer],
  );

  const areAllTodosCompleted = useMemo(
    () => activeTodosCount === 0,
    [activeTodosCount],
  );

  const hasCompletedTodos = useMemo(
    () => todosFromServer.some(todo => todo.completed),
    [todosFromServer],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header areAllTodosCompleted={areAllTodosCompleted} />

        {!!todosFromServer.length && <TodoList todos={visibleTodos} />}

        {!!todosFromServer.length && (
          <Footer
            currFilter={filter}
            activeTodosCount={activeTodosCount}
            hasCompletedTodos={hasCompletedTodos}
            onFilterClick={setFilter}
          />
        )}
      </div>

      <Notification
        errorMessage={errorMessage}
        isHidden={isNotificationHidden}
        onClose={setIsNotificationHidden}
      />
    </div>
  );
};
