import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { NewTodoField } from './components/NewTodoField';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

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

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoField />

        {!isLoading && todos.length > 0 && <TodoList todos={todos} />}

        {!isLoading && todos.length > 0 && <Footer todos={todos} />}
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
