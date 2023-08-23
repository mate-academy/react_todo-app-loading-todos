/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';

const USER_ID = 11361;

// https://mate.academy/students-api/todos?userId=11361

// const todos = client.get('/todos?userId=11361');

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [updatedTodos, setuptadedTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<string>('all');

  useEffect(() => {
    client.get<Todo[]>('/todos?userId=11361')
      .then((json: Todo[]) => setTodos(json))
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 3000);
      });
  }, []);

  useEffect(() => {
    setuptadedTodos(todos);
  }, [todos]);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (sortBy) {
        case 'completed':
          return todo.completed === true;
        case 'active':
          return todo.completed === false;
        case 'all':
          return todo;
        default:
          return todo;
      }
    });

    setuptadedTodos(filteredTodos);
  }, [sortBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {updatedTodos.map(todo => (
            <div
              className={todo.completed ? 'todo completed' : 'todo'}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span className="todo__title">
                {todo.title}
              </span>

              {/* Remove button appears only on hover */}
              <button type="button" className="todo__remove">×</button>

              {/* overlay will cover the todo while it is being updated */}
              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            {todos.filter(todo => todo.completed === true).length}
            {' '}
            items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={sortBy === 'all'
                ? 'filter__link selected'
                : 'filter__link'}
              onClick={() => setSortBy('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={sortBy === 'active'
                ? 'filter__link selected'
                : 'filter__link'}
              onClick={() => setSortBy('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={sortBy === 'completed'
                ? 'filter__link selected'
                : 'filter__link'}
              onClick={() => setSortBy('completed')}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={error
          ? 'notification is-danger is-light has-text-weight-normal'
          : 'notification is-danger is-light has-text-weight-normal hidden'}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError(false)}
        />

        {/* show only one message at a time */}
        Unable to load a todo
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
