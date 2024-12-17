import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Filter } from './types/Filter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  if (!USER_ID) return <UserWarning />;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {error && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button type="button" className="delete" onClick={() => setError('')} />
          {error}
        </div>
      )}

      <Header todos={todos} setTodos={setTodos} showError={showError} />

      {isLoading ? (
        <div className="loader" data-cy="Loader">Loading...</div>
      ) : (
        <>
          <TodoList todos={filteredTodos} setTodos={setTodos} />
          <Footer
            filter={filter}
            setFilter={setFilter}
            todosCount={todos.filter(todo => !todo.completed).length}
            clearCompleted={() => setTodos(todos.filter(todo => !todo.completed))}
          />
        </>
      )}
    </div>
  );
};
