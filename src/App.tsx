/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { AppHeader } from './components/app-header';
import { Error } from './components/error';
import { AppFooter } from './components/app-footer';
import { ToDo } from './components/todo';
import { Errors } from './types/errors';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos?.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    setError(null);
    setIsLoading(true);

    getTodos()
      .then(res => setTodos(res))
      .catch(() => setError(Errors.errorLoad))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <AppHeader setError={setError} setTodos={setTodos} todos={todos || []} />
      <div className="todoapp__content">
        {!isLoading && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos?.map(todo => <ToDo todo={todo} key={todo.id} />)}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {todos?.length && (
          <AppFooter todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <Error error={error} setError={setError} />
    </div>
  );
};
