/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { Filter } from './Filter';
import { CustomNotification } from './components/CustomNotification';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [isNotificationHidden, setIsNotificationHidden] = useState(true);

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

  const allTodosCompleted = useMemo(
    () => activeTodosCount === 0,
    [activeTodosCount],
  );

  const hasCompletedTodos = useMemo(
    () => todosFromServer.some(todo => todo.completed),
    [todosFromServer],
  );

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .catch(() => {
        setIsNotificationHidden(false);
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
          setIsNotificationHidden(true);
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header allTodosCompleted={allTodosCompleted} />

        {!!todosFromServer.length && <TodoList todos={visibleTodos} />}

        {!!todosFromServer.length && (
          <Footer
            activeTodosCount={activeTodosCount}
            currFilter={filter}
            hasCompletedTodos={hasCompletedTodos}
            onFilterClick={setFilter}
          />
        )}
      </div>

      <CustomNotification
        errorMessage={errorMessage}
        isNotificationHidden={isNotificationHidden}
        onClose={setIsNotificationHidden}
      />
    </div>
  );
};
