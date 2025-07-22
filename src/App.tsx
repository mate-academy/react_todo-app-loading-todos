/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterOption } from './types/FilterOption';
import { ErrorMessage } from './types/ErrorMessage';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoForm } from './components/TodoForm';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorMessage | ''>('');
  const [filter, setFilter] = useState<FilterOption>('All');

  const fetchTodos = async () => {
    setLoading(true);
    setError('');

    try {
      const todosData = await getTodos();

      setTodos(todosData);
    } catch {
      setError(ErrorMessage.LoadTodos);
    } finally {
      setLoading(false);

      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    fetchTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'Active':
        return todos.filter(t => !t.completed);
      case 'Completed':
        return todos.filter(t => t.completed);
      case 'All':
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );
  const completedCount = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">My todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        {loading ? (
          <div className="todoapp__loader" data-cy="Loader"></div>
        ) : (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              todos={todos}
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          </>
        )}
      </div>

      <ErrorNotification message={error} onClear={() => setError('')} />
    </div>
  );
};
