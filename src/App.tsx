import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (USER_ID) {
      setLoading(true);
      getTodos()
        .then(setTodos)
        .catch(() => setError('Unable to load todos'))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [newTodo]);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      setError('Title should not be empty');
      return;
    }

    setLoading(true);

    createTodo(newTodo)
      .then(newTodoItem => {
        setTodos(prevTodos => [...prevTodos, newTodoItem]);
        setNewTodo('');
      })
      .catch(() => {
        setError('Unable to add a todo');
      })
      .finally(() => setLoading(false));
  };

  const handleToggleTodo = (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    setLoading(true);

    updateTodo(todo.id, updatedTodo)
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.map(t => (t.id === todo.id ? updatedTodo : t)),
        );
      })
      .catch(() => {
        setError('Unable to update a todo');
      })
      .finally(() => setLoading(false));
  };

  const handleToggleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const newStatus = !allCompleted;

    setLoading(true);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: newStatus,
    }));

    Promise.all(
      updatedTodos.map(todo =>
        updateTodo(todo.id, todo).catch(() => {
          setError('Unable to update a todo');
        }),
      ),
    )
      .then(() => {
        setTodos(updatedTodos);
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteTodo = (todoId: number) => {
    const deletedTodo = todos.find(todo => todo.id === todoId);
    if (!deletedTodo) return;
    setLoading(true);

    deleteTodo(todoId)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
      })
      .catch(() => {
        setError('Unable to delete a todo');
      })
      .finally(() => setLoading(false));
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditingTodoTitle(todo.title);
  };

  const handleUpdateTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (editingTodoTitle.trim() === '') {
      handleDeleteTodo(editingTodoId as number);
      return;
    }

    const updatedTodo = todos.find(todo => todo.id === editingTodoId);
    if (!updatedTodo) return;

    if (updatedTodo.title === editingTodoTitle) {
      setEditingTodoId(null);
      return;
    }

    setLoading(true);

    const newTodo = { ...updatedTodo, title: editingTodoTitle };

    updateTodo(editingTodoId as number, newTodo)
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.map(todo => (todo.id === editingTodoId ? newTodo : todo)),
        );
        setEditingTodoId(null);
      })
      .catch(() => {
        setError('Unable to update a todo');
      })
      .finally(() => setLoading(false));
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return false;
  });

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      {!USER_ID ? (
        <UserWarning />
      ) : (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <header className="todoapp__header">
              <button
                type="button"
                className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
                data-cy="ToggleAllButton"
                onClick={handleToggleAllTodos}
              />

              <form onSubmit={handleAddTodo}>
                <input
                  ref={inputRef}
                  data-cy="NewTodoField"
                  type="text"
                  className="todoapp__new-todo"
                  placeholder="What needs to be done?"
                  value={newTodo}
                  onChange={e => setNewTodo(e.target.value)}
                  disabled={loading}
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
                  {editingTodoId === todo.id ? (
                    <form onSubmit={handleUpdateTodo}>
                      <input
                        type="text"
                        value={editingTodoTitle}
                        onChange={e => setEditingTodoTitle(e.target.value)}
                        onBlur={handleUpdateTodo}
                        onKeyUp={e => {
                          if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        className="todo__edit"
                      />
                    </form>
                  ) : (
                    <>
                      <label className="todo__status-label">
                        <input
                          data-cy="TodoStatus"
                          type="checkbox"
                          className="todo__status"
                          checked={todo.completed}
                          onChange={() => handleToggleTodo(todo)}
                          disabled={loading}
                        />
                      </label>

                      <span
                        data-cy="TodoTitle"
                        className="todo__title"
                        onDoubleClick={() => handleEditTodo(todo)}
                      >
                        {todo.title}
                      </span>

                      <button
                        type="button"
                        className="todo__remove"
                        data-cy="TodoDelete"
                        onClick={() => handleDeleteTodo(todo.id)}
                        disabled={loading}
                      >
                        ×
                      </button>

                      {loading && (
                        <div data-cy="TodoLoader" className="modal overlay">
                          <div className="modal-background has-background-white-ter" />
                          <div className="loader" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </section>

            {todos.length > 0 && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {todos.filter(todo => !todo.completed).length} items left
                </span>

                <nav className="filter" data-cy="Filter">
                  <a
                    href="#/"
                    className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                    data-cy="FilterLinkAll"
                    onClick={() => setFilter('all')}
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                    data-cy="FilterLinkActive"
                    onClick={() => setFilter('active')}
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                    data-cy="FilterLinkCompleted"
                    onClick={() => setFilter('completed')}
                  >
                    Completed
                  </a>
                </nav>

                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                  onClick={() =>
                    setTodos(todos.filter(todo => !todo.completed))
                  }
                  disabled={todos.every(todo => !todo.completed)}
                >
                  Clear completed
                </button>
              </footer>
            )}
          </div>

          {error && (
            <div
              data-cy="ErrorNotification"
              className="notification is-danger is-light has-text-weight-normal"
            >
              <button
                data-cy="HideErrorButton"
                type="button"
                className="delete"
                onClick={() => setError(null)}
              />
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
};
