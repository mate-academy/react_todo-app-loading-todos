import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { UserWarning } from './components/UserWarning/UserWarning';
import { Todo } from './types/Todo';
import { TodoFilter } from './types/TodoFilter';
import { ErrorType } from './types/errorType';

const USER_ID = 11725;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [currentFilter, setCurrentFilter]
    = useState<TodoFilter>(TodoFilter.All);

  useEffect(() => {
    getTodos(11725)
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

        {/* Hide the footer if there are no todos */}
        {todos && todos.length > 0 && (
          <TodoFooter
            todos={filteredTodos}
            currentFilter={currentFilter}
            filterChange={handleFilterChange}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorNotification
        errorType={errorType}
      />
    </div>
  );
};
