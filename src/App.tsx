/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { clearCompletedTodos, deleteTodo, toggleTodoStatus } from './api/todos';

export const USER_ID = 12154;

export const App: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function for fetching todos
  const fetchTodos = async () => {
    setError(null); // Hide error before each request
    try {
      const data = await client.get<Todo[]>('/todos', USER_ID);

      setTodos(data);
    } catch (err) {
      setError('Unable to load todos');
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Automatically hide the error
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [error]);

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Filter todos based on the selected filter
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
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div key={todo.id} className={`todo ${todo.completed ? 'completed' : ''}`}>
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoStatus(todo.id)}
                />
              </label>
              <span className="todo__title">{todo.title}</span>
              <button
                type="button"
                className="todo__remove"
                onClick={() => deleteTodo(todo.id)}
              >
                ×
              </button>
            </div>
          ))}
        </section>

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.filter(todo => !todo.completed).length}
            items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
              onClick={() => handleFilterChange('all')}
              data-cy="FilterLinkAll"
            >
              All
            </a>
            <a
              href="#/active"
              className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
              onClick={() => handleFilterChange('active')}
              data-cy="FilterLinkActive"
            >
              Active
            </a>
            <a
              href="#/completed"
              className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
              onClick={() => handleFilterChange('completed')}
              data-cy="FilterLinkCompleted"
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className={`todoapp__clear-completed ${todos.some(todo => todo.completed) ? '' : 'hidden'}`}
            onClick={clearCompletedTodos(USER_ID, todos)}
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      </div>
    </div>
  );
};
