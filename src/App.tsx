import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoFooter } from './components/TodoFoot';
import { TodoHeader } from './components/TodoHed';
import { TodoList } from './components/TodoList';
import { UserWarning } from './components/UserWar/UserWarning';
import { Todo } from './types/Todo';
import { TodoFilter } from './types/TodoFilter';
import { ErrorType } from './types/errorType';

const USER_ID = 12170;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [currentFilter, setCurrentFilter]
    = useState<TodoFilter>(TodoFilter.All);

  useEffect(() => {
    getTodos(12170)
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(() => {
        setErrorType(ErrorType.LoadError);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case TodoFilter.Active:
        return todos.filter(todo => !todo.completed);
      case TodoFilter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  const handleFilterChange = (filter: TodoFilter) => {
    setCurrentFilter(filter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <TodoHeader />

        <TodoList todos={filteredTodos} />

        {todos && todos.length > 0 && (
          <TodoFooter
            todos={filteredTodos}
            currentFilter={currentFilter}
            filterChange={handleFilterChange}
          />
        )}
      </div>

      <ErrorNotification
        errorType={errorType}
      />
    </div>
  );
};
