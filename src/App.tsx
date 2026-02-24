/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { useEffect, useState, useRef } from 'react';
import { getTodos } from './api/todos';
import { Todo, FilterType, ErrorMessage } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const field = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [loading, setLoading] = useState(false);
  const [deletingIds] = useState<number[]>([]);

  async function loadTodos() {
    setError('');
    setLoading(true);

    try {
      const result = await getTodos();

      setTodos(result);
    } catch {
      setError(ErrorMessage.UnableLoadTodos);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
    field.current?.focus();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function getFilteredTodos() {
    if (filter === FilterType.All) {
      return todos;
    }

    if (filter === FilterType.Active) {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === FilterType.Completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  const filteredTodos = getFilteredTodos();
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const itemLabel = activeTodosCount === 1 ? 'item' : 'items';

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header loading={loading} />
        {filteredTodos.length > 0 && (
          <TodoList
            todos={filteredTodos}
            loading={loading}
            deletingIds={deletingIds}
          />
        )}

        {todos.length > 0 && (
          <Footer
            activeTodosCount={activeTodosCount}
            itemLabel={itemLabel}
            filter={filter}
            setFilter={setFilter}
            loading={loading}
          />
        )}
      </div>

      <ErrorNotification error={error} loading={loading} setError={setError} />
    </div>
  );
};
