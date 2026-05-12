import React, { useEffect, useMemo, useRef, useState } from 'react';

import { getTodos, USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './types/ErrorMessage';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const getFilterFromHash = (): FilterStatus => {
  if (window.location.hash === '#/active') {
    return FilterStatus.Active;
  }

  if (window.location.hash === '#/completed') {
    return FilterStatus.Completed;
  }

  return FilterStatus.All;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] =
    useState<FilterStatus>(getFilterFromHash);
  const [errorMessage, setErrorMessage] = useState('');
  const newTodoField = useRef<HTMLInputElement>(null);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return todos.filter(todo => !todo.completed);

      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filterStatus, todos]);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.Load);
      });
  }, []);

  useEffect(() => {
    newTodoField.current?.focus();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader
          hasTodos={todos.length > 0}
          allTodosCompleted={activeTodosCount === 0}
          inputRef={newTodoField}
        />

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <TodoFooter
            activeTodosCount={activeTodosCount}
            hasCompletedTodos={hasCompletedTodos}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
