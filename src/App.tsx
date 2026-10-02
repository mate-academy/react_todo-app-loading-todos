import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos, USER_ID } from './api/todos';
import { UserWarning } from './UserWarning';

import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.all);

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setTimeout(() => setErrorMessage(''), 3000));
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === FilterType.active) {
      return !todo.completed;
    }

    if (filter === FilterType.completed) {
      return todo.completed;
    }

    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <TodoFooter
              activeCount={activeCount}
              filter={filter}
              onFilterChange={setFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
