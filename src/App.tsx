import React, { useEffect, useRef, useState } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.All);
  const [isAdding, setIsAdding] = useState(false);

  // 🔥 edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  // 🔥 ВАЖНО: функция объявлена ДО использования
  const loadTodos = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
    } catch {
      setError('Unable to load todos');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    try {
      setIsAdding(true);

      const newTodo = await createTodo(trimmed);

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
    } catch {
      setError('Unable to add todo');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      setError('Unable to delete todo');
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch {
      setError('Unable to update todo');
    }
  };

  const handleToggleAll = async () => {
    const allCompleted = todos.every(todo => todo.completed);

    try {
      const updatedTodos = await Promise.all(
        todos.map(todo =>
          updateTodo(todo.id, {
            completed: !allCompleted,
          }),
        ),
      );

      setTodos(updatedTodos);
    } catch {
      setError('Unable to update todos');
    }
  };

  // 🔥 EDIT
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleEditSubmit = async (id: number) => {
    try {
      const updated = await updateTodo(id, {
        title: editTitle.trim(),
      });

      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));

      setEditingId(null);
      setEditTitle('');
    } catch {
      setError('Unable to update todo');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              className="todoapp__new-todo"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              disabled={isAdding}
            />
          </form>
        </header>

        {/* Toggle All */}
        {todos.length > 0 && (
          <button
            type="button"
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
          >
            Toggle all
          </button>
        )}

        {!!todos.length && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <div key={todo.id} data-cy="Todo">
                <input
                  type="checkbox"
                  data-cy="TodoStatus"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                />

                {editingId === todo.id ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleEditSubmit(todo.id);
                    }}
                  >
                    <input
                      data-cy="TodoTitleField"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      onBlur={() => handleEditSubmit(todo.id)}
                      autoFocus
                    />
                  </form>
                ) : (
                  <span
                    data-cy="TodoTitle"
                    onDoubleClick={() => startEditing(todo)}
                  >
                    {todo.title}
                  </span>
                )}

                <button
                  type="button"
                  data-cy="TodoDelete"
                  onClick={() => handleDelete(todo.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </section>
        )}

        {!!todos.length && (
          <Footer currentFilter={filter} setFilter={setFilter} />
        )}
      </div>

      <ErrorNotification error={error} onClose={() => setError('')} />
    </div>
  );
};
