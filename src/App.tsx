import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { NewTodoField } from './components/NewTodoField';
import { ErrorNotification } from './components/ErrorNotification';
import { Filter } from './enums/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [filter, setFilter] = useState(Filter.All);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoField />

        {!isLoading && todos.length > 0 && <TodoList todos={visibleTodos} />}

        {!isLoading && todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            filter={filter}
            onFilterChange={setFilter}
          />
        )}
      </div>

      <ErrorNotification
        isVisible={hasError}
        onClose={() => setHasError(false)}
      />

      {isLoading && (
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
