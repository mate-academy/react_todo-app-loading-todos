/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './types/Error';
import { Status } from './types/Status';

const USER_ID = 12172;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<Status>(Status.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(res => setTodos(res))
      .catch(() => setError(Error.UnableToLoadAll));
  }, []);

  const filterTodos = useCallback((currentTodos: Todo[], status: Status) => {
    return currentTodos.filter(todo => {
      switch (status) {
        case Status.All:
          return todo;
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, []);

  const filteredTodos = filterTodos(todos, filter);

  const isCompleted = todos.filter(todo => todo.completed === true).length > 0;

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        <Footer
          filterTodos={setFilter}
          isCompleted={isCompleted}
          todos={filteredTodos}
          handleClearCompleted={handleClearCompleted}
        />
      </div>

      {error && <ErrorMessage error={error} close={() => setError(null)} />}
    </div>
  );
};
