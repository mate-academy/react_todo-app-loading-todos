import React, { useEffect, useMemo } from 'react';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './component/Header';
import { Footer } from './component/Footer';
import { TodoList } from './component/TodoList';
import { ErrorNotification } from './component/ErrorNotification';
import { ErrorMessages } from './types/ErrorMessages';
import { FilterParams } from './types/FilterParams';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filter, setFilter] = React.useState<FilterParams>(FilterParams.ALL);
  const [error, setError] = React.useState<ErrorMessages | null>(null);

  const isAllCompleted = todos.every(todo => todo.completed);
  const isAnyCompleted = todos.some(todo => todo.completed);
  const notCompletedCount = isAllCompleted
    ? 0
    : todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    todoService
      .getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setError(ErrorMessages.UNABLE_TO_LOAD_TODOS));
  }, []);

  const handleErrorClose = () => setError(null);

  const visibleTodos = useMemo(() => {
    if (filter === FilterParams.ALL) {
      return todos;
    }

    return todos.filter(todo =>
      filter === FilterParams.ACTIVE ? !todo.completed : todo.completed,
    );
  }, [todos, filter]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isAllCompleted={isAllCompleted}
          isPresentTodos={todos.length > 0}
        />
        <TodoList todos={visibleTodos} />
        {todos.length > 0 && (
          <Footer
            isAnyCompleted={isAnyCompleted}
            notCompletedCount={notCompletedCount}
            selectedFilter={filter}
            onFilterChange={setFilter}
          />
        )}
      </div>
      <ErrorNotification onErrorClose={handleErrorClose} error={error} />
    </div>
  );
};
