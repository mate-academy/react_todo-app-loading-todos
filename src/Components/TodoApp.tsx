import React, { useEffect, useState } from 'react';
import { StatusFilter, Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { TodoHeader } from './TodoHeader';
import { TodoMain } from './TodoMain';
import { TodoFooter } from './TodoFooter';
import { ErrorNotification } from './ErrorNotification/ErrorNotification';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessege, setErrorMessege] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrorMessege('');
    setLoading(true);

    getTodos()
      .then(loadingTodos => setTodos(loadingTodos))
      .catch(() => {
        setErrorMessege('Unable to load todos');
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    return (
      statusFilter === 'all' ||
      (statusFilter === 'active' && !todo.completed) ||
      (statusFilter === 'completed' && todo.completed)
    );
  });

  return (
    <>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <div className="todoapp__content">
          <TodoHeader todos={todos} />
          {todos && <TodoMain visibleTodos={visibleTodos} loading={loading} />}
          {todos && (
            <TodoFooter setStatusFilter={setStatusFilter} todos={todos} />
          )}
        </div>
        <ErrorNotification messege={errorMessege} />
      </div>
    </>
  );
};
