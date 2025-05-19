/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorType } from './types/ErrorType';
import { FilterStatus } from './types/FilterStatus';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>('');
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setError('');
      })
      .catch(() => setError('load'))
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const getFilteredTodos = (
    allTodos: Todo[],
    currentFilter: FilterStatus,
  ): Todo[] => {
    return allTodos.filter(todo => {
      const matchesStatus =
        currentFilter === FilterStatus.All ||
        (currentFilter === FilterStatus.Active && !todo.completed) ||
        (currentFilter === FilterStatus.Completed && todo.completed);

      return matchesStatus;
    });
  };

  const filteredTodos = getFilteredTodos(todos, filter);

  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />
        <TodoList todos={filteredTodos} isLoading={isLoading} />
        <TodoFooter
          todos={todos}
          currentFilter={filter}
          onFilterChange={setFilter}
          onClearCompleted={handleClearCompleted}
        />
      </div>
      <ErrorNotification
        error={error}
        setError={setError}
        onClose={() => setError('')}
      />
    </div>
  );
};
