/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchedTodos = await getTodos();

        setTimeout(() => setTodos(fetchedTodos), 300);
      } catch {
        setError('Unable to load todos');
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    fetchTodos();
  }, []);

  useEffect((): void => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodo.trim()) {
      setError('Title should not be empty');

      return;
    }

    const tempId = `temp-${Date.now()}`;
    const tempTodo: Todo = {
      id: +tempId,
      title: newTodo.trim(),
      completed: false,
      userId: USER_ID,
    };

    setTodos(prevTodos => [...prevTodos, tempTodo]);
    setNewTodo('');

    setIsLoading(true);
    try {
      const newTodoData = await client.post<Todo>('/todos', {
        title: newTodo,
        userId: USER_ID,
        completed: false,
      });

      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === +tempId ? newTodoData : todo)),
      );
    } catch {
      // setTodos(prevTodos => prevTodos.filter(todo => todo.id !== -tempId));
      setError('Unable to add todo');
      setIsLoading(false);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === +tempId ? { ...todo, error: true } : todo,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    try {
      await Promise.all(
        completedTodos.map(todo => client.delete(`/todos/${todo.id}`)),
      );

      setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    } catch {
      setError('Unable to clear completed todos');
    }
  };

  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* Add a todo on form submit */}
          <form onSubmit={handleAddTodo}>
            <input
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
              disabled={isLoading}
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
                  readOnly
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  setTodos(prevTodos =>
                    prevTodos.filter(t => t.id !== todo.id),
                  );
                  client
                    .delete(`/todos/${todo.id}`)
                    .catch(() => setError('Unable to delete todo'));
                }}
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={`modal overlay ${isLoading ? 'is-active' : 'is-hidden'}`}
              >
                <div className="modal-background has-background-whitester"></div>
                <div className="loader"></div>
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
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
                className={`filter__link ${
                  filter === 'active' ? 'selected' : ''
                }`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${
                  filter === 'completed' ? 'selected' : ''
                }`}
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
              disabled={completedTodosCount === 0}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          error ? '' : 'hidden'
        }`}
      >
        <button
          type="button"
          className="delete"
          data-cy="HideErrorButton"
          onClick={() => setError(null)}
        />
        {error || ''}
      </div>
    </div>
  );
};
