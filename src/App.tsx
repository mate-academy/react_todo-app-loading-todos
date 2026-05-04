import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { Loader } from './components/Loader';

const ERROR_MESSAGES = {
  failedLoadingTodos: 'Unable to load todos',
  failedAddingTodo: 'Unable to add a todo',
  failedDeletingTodo: 'Unable to delete a todo',
  failedUpdatingTodo: 'Unable to update a todo',
  emptyTitle: 'Title should not be empty',
};

export enum FilterType {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export type Filter = `${FilterType}`;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isHiddenError, setIsHiddenError] = React.useState(true);

  const [appliedFilter, setAppliedFilter] = useState<Filter>(FilterType.ALL);

  const setFilter = useCallback((filter: Filter) => {
    setAppliedFilter(filter);
  }, []);

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ERROR_MESSAGES.failedLoadingTodos);
        setIsHiddenError(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    switch (appliedFilter) {
      case FilterType.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterType.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, appliedFilter]);

  const notCompletedTodosLength = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {isLoading && <Loader />}

        <TodoList todos={visibleTodos} className="todoapp__main" />

        {todos.length !== 0 && (
          <Footer
            notCompletedTodosLength={notCompletedTodosLength}
            appliedFilter={appliedFilter}
            onFilterChange={setFilter}
          />
        )}
      </div>

      <ErrorNotification
        message={errorMessage}
        hidden={isHiddenError}
        hideMessage={() => setIsHiddenError(true)}
      />
    </div>
  );
};
