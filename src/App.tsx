import React, { useEffect, useMemo, useState } from 'react';
import { client } from './utils/fetchClient';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';

import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

type Filter = 'all' | 'active' | 'completed';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    client
      .get<Todo[]>(`todos?userId=${USER_ID}`)
      .then(data => {
        setTodos(data);
        setEmpty(data.length === 0);
      })
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const itemsLeft = todos.filter(t => !t.completed).length;

  return (
    <div className="todoapp">
      <Header
        onAddTodo={todo => {
          setTodos(current => [...current, todo]);
          setEmpty(false);
        }}
        onError={setError}
      />

      {loading && <div className="loader" />}

      {!loading && empty && (
        <p className="notification is-info">
          You don’t have todos at all!
        </p>
      )}

      {!loading && todos.length > 0 && (
        <section className="todoapp__main">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>
      )}

      {!loading && todos.length > 0 && (
        <Footer
          filter={filter}
          onChange={setFilter}
          itemsLeft={itemsLeft}
        />
      )}

      <Error message={error} onClose={() => setError(null)} />
    </div>
  );
};
