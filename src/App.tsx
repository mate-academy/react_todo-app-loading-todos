import React, { useState, useEffect, useRef } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingTodos, setLoadingTodos] = useState<number[]>([]);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setLoading(true);
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      setError('Title should not be empty');

      return;
    }

    setError('');
    setLoading(true);
    createTodo({
      userId: USER_ID,
      title: newTodo.trim(),
      completed: false,
    })
      .then(todo => setTodos(prev => [...prev, todo]))
      .catch(() => setError('Unable to add a todo'))
      .finally(() => {
        setLoading(false);
        setNewTodo('');
      });
  };

  const handleToggleTodo = async (id: number) => {
    const existingTodo = todos.find(todo => todo.id === id);

    if (!existingTodo) {
      return;
    }

    setError('');
    setLoadingTodos(prev => [...prev, id]);

    try {
      const updatedTodo = await updateTodo(id, {
        completed: !existingTodo.completed,
      });

      setTodos(prevTodos =>
        prevTodos.map(item => (item.id === id ? updatedTodo : item)),
      );
    } catch {
      setError('Unable to update a todo');
    } finally {
      setLoadingTodos(prev => prev.filter(todoId => todoId !== id));
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setError('');
    setLoadingTodos(prev => [...prev, id]);

    try {
      await deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch {
      setError('Unable to delete a todo');
    } finally {
      setLoadingTodos(prev => prev.filter(todoId => todoId !== id));
    }
  };

  const handleToggleAll = () => {
    todos.forEach(todo => handleToggleTodo(todo.id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

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
            className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
            disabled={loading}
          />

          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              ref={inputRef}
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
              <input
                id={`todo-${todo.id}`}
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                disabled={loading}
              />


              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDeleteTodo(todo.id)}
                disabled={loadingTodos.includes(todo.id)}
              >
                ×
              </button>

              {loadingTodos.includes(todo.id) && (
                <>
                  <div
                    data-cy="TodoLoader"
                    className={`modal overlay ${loading ? 'is-active' : ''}`}
                  />
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
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
              onClick={() => {
                const completedTodos = todos.filter(todo => todo.completed);

                Promise.all(
                  completedTodos.map(todo => handleDeleteTodo(todo.id)),
                )
                  .then(() => {
                    throw new Error('All completed todos deleted successfully');
                  })
                  .catch(err => {
                    throw new Error(
                      'An error occurred while deleting todos:',
                      err,
                    );
                  });
              }}
              disabled={loading || todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal closehidden ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
