/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos, addTodo, deleteTodo, updateTodo } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();

      setTodos(data);
      setError(null);
    } catch {
      setError('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      setError('Title should not be empty');

      return;
    }

    try {
      setLoading(true);
      const createdTodo = await addTodo(newTodo);

      setTodos([...todos, createdTodo]);
      setNewTodo('');
      setError(null);
    } catch {
      setError('Unable to add a todo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      setTodos(
        todos.map(todo =>
          todo.id === todoId ? { ...todo, isLoading: true } : todo,
        ),
      );
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
      setError(null);
    } catch {
      setError('Unable to delete a todo');
      setTodos(
        todos.map(todo =>
          todo.id === todoId ? { ...todo, isLoading: false } : todo,
        ),
      );
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      setTodos(
        todos.map(t => (t.id === todo.id ? { ...t, isLoading: true } : t)),
      );
      const updatedTodo = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t)));
      setError(null);
    } catch {
      setError('Unable to update a todo');
      setTodos(
        todos.map(t => (t.id === todo.id ? { ...t, isLoading: false } : t)),
      );
    }
  };

  const filteredTodos = () => {
    switch (activeFilter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''} `}
            data-cy="ToggleAllButton"
            onClick={() => todos.forEach(todo => handleToggleTodo(todo))}
            disabled={loading || todos.length === 0}
          />

          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              autoFocus
              disabled={loading}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos().map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={`todo ${todo.completed ? 'completed' : ''}`}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo)}
                  disabled={todo.isLoading}
                />
              </label>
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDeleteTodo(todo.id)}
                disabled={todo.isLoading}
              >
                ×
              </button>

              {/* Always include the loader element but hide it when not loading */}
              <div
                data-cy="TodoLoader"
                className={`modal overlay ${todo.isLoading ? 'is-active' : ''}`}
                style={{ display: todo.isLoading ? 'block' : 'none' }}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Додаємо фільтри */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${activeFilter === 'All' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setActiveFilter('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${activeFilter === 'Active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setActiveFilter('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${activeFilter === 'Completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setActiveFilter('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* Додаємо кнопку для очищення завершених завдань */}
            {todos.some(todo => todo.completed) && (
              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
                onClick={() => {
                  setTodos(todos.filter(todo => !todo.completed)); // Фільтруємо всі завдання, де completed === false
                }}
              >
                Clear Completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* Using the 'hidden' class instead of style display */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger ${error === null ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error || ''}
      </div>
    </div>
  );
};
