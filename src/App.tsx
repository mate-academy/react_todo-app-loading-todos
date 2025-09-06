/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, removeTodo, updateTodo, USER_ID } from './api/todos';
import { Todo } from '../src/types/Todo';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [message, setMessage] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const delay = () => 200;

  const withLoader = (id: number, callback: () => void) => {
    setLoadingTodoIds(prev => [...prev, id]);
    setTimeout(() => {
      callback();
      setLoadingTodoIds(prev => prev.filter(lid => lid !== id));
    }, delay());
  };

  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);
    const loaderId = Date.now();

    setLoadingTodoIds(prev => [...prev, loaderId]);

    try {
      await Promise.all(completedTodos.map(todo => removeTodo(todo.id)));
      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch {
      setMessage('Failed to clear completed todos');
    } finally {
      setLoadingTodoIds(prev => prev.filter(id => id !== loaderId));
    }
  };

  const saveTodo = (id: number, title: string) =>
    withLoader(id, async () => {
      try {
        await updateTodo(id, { title });
        setTodos(prevTodos =>
          prevTodos.map(t => (t.id === id ? { ...t, title } : t)),
        );
      } catch {
        setMessage('Failed to update todo');
      }
    });

  const toggleTodo = (id: number) =>
    withLoader(id, async () => {
      const todo = todos.find(t => t.id === id);

      if (!todo) {
        return;
      }

      try {
        const updated = { completed: !todo.completed };

        await updateTodo(id, updated);
        setTodos(prev =>
          prev.map(t => (t.id === id ? { ...t, ...updated } : t)),
        );
      } catch {
        setMessage('Failed to toggle todo');
      }
    });

  const deleteTodo = (id: number) =>
    withLoader(id, async () => {
      try {
        await removeTodo(id);
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      } catch {
        setMessage('Failed to delete todo');
      }
    });

  const filteredTodos = todos.filter(todo => {
    if (selectedFilter === 'active') {
      return !todo.completed;
    }

    if (selectedFilter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    const loaderId = 0;

    setLoadingTodoIds(prev => [...prev, loaderId]);

    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(() => setMessage('Unable to load todos'))
      .finally(() =>
        setLoadingTodoIds(prev => prev.filter(id => id !== loaderId)),
      );
  }, []);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = newTodo.trim();

    if (!trimmedTitle) {
      return setMessage('Title should not be empty');
    }

    const newTodoItem: Omit<Todo, 'id'> = {
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    const loaderId = Date.now();

    setLoadingTodoIds(prev => [...prev, Date.now()]);

    try {
      const savedTodo = await createTodo(newTodoItem);

      setTodos(prev => [...prev, savedTodo]);
      setNewTodo('');
    } catch {
      setMessage('Failed to add todo');
    } finally {
      setLoadingTodoIds(prev => prev.filter(id => id !== loaderId));
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${
                todos.every(todo => todo.completed) ? 'active' : ''
              }`}
              data-cy="ToggleAllButton"
              onClick={() => {
                const allCompleted = todos.every(todo => todo.completed);

                setTodos(
                  todos.map(todo => ({ ...todo, completed: !allCompleted })),
                );
              }}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
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
                  onChange={() => toggleTodo(todo.id)}
                />
              </label>

              {editingTodoId === todo.id ? (
                <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={editingTitle}
                    autoFocus
                    onChange={e => setEditingTitle(e.target.value)}
                    onBlur={() => {
                      if (editingTitle.trim()) {
                        saveTodo(todo.id, editingTitle.trim());
                      } else {
                        deleteTodo(todo.id);
                      }

                      setEditingTodoId(null);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                      }

                      if (e.key === 'Escape') {
                        setEditingTodoId(null);
                        setEditingTitle(todo.title);
                      }
                    }}
                  />
                </form>
              ) : (
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => {
                    setEditingTodoId(todo.id);
                    setEditingTitle(todo.title);
                  }}
                >
                  {todo.title}
                </span>
              )}

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>

              {/* overlay loader */}
              <div
                data-cy="TodoLoader"
                className={`modal overlay ${loadingTodoIds.includes(todo.id) ? 'is-active' : ''}`}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${selectedFilter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setSelectedFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${selectedFilter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setSelectedFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${selectedFilter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setSelectedFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className={`todoapp__clear-completed`}
              data-cy="ClearCompletedButton"
              onClick={clearCompleted}
              disabled={todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!message ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setMessage('')}
        />
        {message}
      </div>
    </div>
  );
};
