/******* eslint-disable jsx-a11y/label-has-associated-control *******/
/******* eslint-disable jsx-a11y/control-has-associated-label *******/
import React, { useEffect, useState } from 'react';
import { addTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { deleteTodo } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError('');
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch (e) {
        setError('Failed to load todos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTitle.trim()) {
      setError('Please enter a valid todo title.');

      return;
    }

    const novoTitle = newTitle.trim();
    const novoTodo: Todo = {
      id: 0,
      userId: 123,
      title: novoTitle,
      completed: false,
    };

    setTempTodo(novoTodo);
    setNewTitle('');
    setError('');
    try {
      const createdTodo = await addTodo({
        title: novoTitle,
        userId: 123,
        completed: false,
      });

      setTodos(prevTodos => [...prevTodos, createdTodo]);
    } catch {
      setError('Unable to add a todo');
    } finally {
      setTempTodo(null);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    setLoading(true);
    setError('');

    try {
      await deleteTodo(todoId);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    } catch {
      setError('Unable to delete todo');
    } finally {
      setLoading(false);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') {
      return true;
    }

    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {error && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setError('')} />
            {error}
          </div>
        )}

        <header className="todoapp__header">
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAddTodo();
              }
            }}
            disabled={loading}
            autoFocus
          />
        </header>

        {loading && <div>Loading...</div>}

        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              {tempTodo && (
                <div className="todo">
                  <span>{tempTodo.title}</span>
                  <div className="loader" />
                </div>
              )}

              {filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`todo ${todo.completed ? 'completed' : ''}`}
                >
                  <span>{todo.title}</span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </section>

            <footer className="todoapp__footer">
              <span>{filteredTodos.length} items left</span>
              <button onClick={() => setFilter('all')}>All</button>
              <button onClick={() => setFilter('active')}>Active</button>
              <button onClick={() => setFilter('completed')}>Completed</button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};
