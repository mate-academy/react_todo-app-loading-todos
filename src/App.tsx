/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';

function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startValue;
    }
  });

  const save = (newValue: T | ((prev: T) => T)) => {
    let valueToStore: T;

    if (typeof newValue === 'function') {
      valueToStore = (newValue as (prev: T) => T)(value);
    } else {
      valueToStore = newValue;
    }

    localStorage.setItem(key, JSON.stringify(valueToStore));
    setValue(valueToStore);
  };

  return [value, save];
}

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todo', []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>('');
  const [filterByStatus, setFilterByStatus] = React.useState<
    'all' | 'active' | 'completed'
  >('all');
  const [code, setCode] = React.useState('');
  const [showNotification, setShowNotification] = React.useState(false);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  React.useEffect(() => {
    if (todos.length === 0) {
      setLoading(true);
      setShowNotification(false);

      setTimeout(() => {
        todoService
          .getTodos()
          .then(setTodos)
          .catch(() => {
            setError('Unable to load todos');
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          })

          .finally(() => setLoading(false));
      }, 100);
    }
  }, []);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      userId: todoService.USER_ID,
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: code.trim(),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setCode('');
  };

  function clearTodos() {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }

  function filteredTodos() {
    if (filterByStatus === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    if (filterByStatus === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  function closeNotification() {
    setShowNotification(false);
  }

  function deleteTodo(todoId: number) {
    todoService.deleteTodo(todoId);
    setTodos(prev => prev.filter(todo => todo.id !== todoId));
  }

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  function toggleTodo(todoId: number) {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    );
  }

  function toggleAllTodos() {
    const shouldComplete = activeTodosCount > 0;

    setTodos(prev =>
      prev.map(todo => ({ ...todo, completed: shouldComplete })),
    );
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {loading && (
        <div className="Loader">
          <div className="Loader__content" />
        </div>
      )}

      {!loading && (
        <div className="todoapp__content">
          <header className="todoapp__header">
            {/* this button should have `active` class only if all todos are completed */}
            <button
              type="button"
              className={
                'todoapp__toggle-all' +
                (activeTodosCount !== 0 ? ' active' : '')
              }
              data-cy="ToggleAllButton"
              onClick={toggleAllTodos}
            />

            {/* Add a todo on form submit */}
            <form onSubmit={handleSubmit}>
              <input
                data-cy="NewTodoField"
                type="text"
                className="todoapp__new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onChange={handleCodeChange}
                value={code}
              />
            </form>
          </header>

          <section className="todoapp__main" data-cy="TodoList">
            {/* This is a completed todo */}
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
                    onChange={() => toggleTodo(todo.id)}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  {' '}
                  ×{' '}
                </button>
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>

          {todos.length > 0 && (
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodosCount} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={
                    'filter__link' +
                    (filterByStatus === 'all' ? ' selected' : '')
                  }
                  data-cy="FilterLinkAll"
                  onClick={() => setFilterByStatus('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={
                    'filter__link' +
                    (filterByStatus === 'active' ? ' selected' : '')
                  }
                  data-cy="FilterLinkActive"
                  onClick={() => setFilterByStatus('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={
                    'filter__link' +
                    (filterByStatus === 'completed' ? ' selected' : '')
                  }
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilterByStatus('completed')}
                >
                  Completed
                </a>
              </nav>

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={clearTodos}
              >
                Clear completed
              </button>
            </footer>
          )}
        </div>
      )}

      <div
        data-cy="ErrorNotification"
        className={
          'notification is-danger is-light has-text-weight-normal' +
          (showNotification ? '' : ' hidden')
        }
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeNotification}
        />
        {/* show only one message at a time */}
        {error}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
    </div>
  );
};
