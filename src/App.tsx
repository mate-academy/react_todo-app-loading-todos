/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const load = async () => {
      const data = await getTodos();

      setTodos(data);
    };

    load();
  }, []);

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const createdTodo = await addTodo({
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    });

    setTodos(prev => [...prev, createdTodo]);
    setTitle('');
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = async (todo: Todo) => {
    const updated = await updateTodo({
      ...todo,
      completed: !todo.completed,
    });

    setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div>
      <h1>Todos</h1>

      <form onSubmit={handleAddTodo}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </form>

      <div>
        {visibleTodos.map(todo => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo)}
            />

            {todo.title}

            <button onClick={() => handleDeleteTodo(todo.id)}>×</button>
          </div>
        ))}
      </div>

      <div>
        <button
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>

        <button
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>

        <button
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div>{activeCount} items left</div>
    </div>
  );
};
