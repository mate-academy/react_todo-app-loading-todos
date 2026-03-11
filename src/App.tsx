/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter, FilterStatus } from './components/TodoFooter';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<FilterStatus>(
    FilterStatus.All,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  // Auto-hide error notification after 3 seconds
  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return todos.filter(todo => !todo.completed);
      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  const { activeTodosCount, completedTodosCount } = useMemo(() => {
    let active = 0;
    let completed = 0;

    for (const todo of todos) {
      if (todo.completed) {
        completed++;
      } else {
        active++;
      }
    }

    return { activeTodosCount: active, completedTodosCount: completed };
  }, [todos]);

  const allCompleted = todos.length > 0 && activeTodosCount === 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader allCompleted={allCompleted} />

        {todos.length > 0 && <TodoList todos={filteredTodos} />}

        {loading && (
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <TodoFooter
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            onClearCompleted={() => {}}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification error={error} onClose={() => setError('')} />
    </div>
  );
};
