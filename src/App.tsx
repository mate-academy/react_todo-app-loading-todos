import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    getTodos()
      .then(res => {
        setTodos(res); // fetchClient zwraca już Todo[]
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load todos');
        setLoading(false);
      });
  }, []);

  const activeCount = todos.filter(t => !t.completed).length;

  // Filtrujemy todos według wybranego filtra
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true; // 'all'
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Todos</h1>

      {error && <div data-cy="ErrorNotification">{error}</div>}

      <input
        data-cy="NewTodoField"
        type="text"
        placeholder="What needs to be done?"
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
      />

      {loading && <p>Loading todos...</p>}

      {!loading && todos.length === 0 && <p>No todos</p>}

      {/* Filtry */}
      <div className="filters">
        <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          disabled={filter === 'active'}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          disabled={filter === 'completed'}
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            data-cy="Todo"
            className={todo.completed ? 'completed' : ''}
          >
            <span data-cy="TodoTitle">{todo.title}</span>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <footer>
          <span data-cy="TodosCounter">
            {activeCount} {activeCount === 1 ? 'item' : 'items'} left
          </span>
        </footer>
      )}
    </div>
  );
};
