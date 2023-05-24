/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Sorting } from './types/Sorting';

const USER_ID = 10404;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Sorting.ALL);
  const [error, setError] = useState(false);

  const activeTodos = todos.filter((todo) => !todo.completed);

  const fetchTodos = async () => {
    const newTodos = await getTodos(USER_ID);

    setTodos(newTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const sortedTodos = todos.filter(todo => {
    switch (filter) {
      case Sorting.ACTIVE: return !todo.completed;
      case Sorting.COMPLETED: return todo.completed;
      default: return todos;
    }
  });

  const visibleTodos = sortedTodos;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length > 0 && (
            <button type="button" className="todoapp__toggle-all active" />
          )}
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
          {visibleTodos.map(todo => (
            <div
              className={cn(
                'todo',
                { completed: todo.completed },
              )}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span className="todo__title">{todo.title}</span>

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

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
             {`${activeTodos.length} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={cn('filter__link',
                  { selected: filter === Sorting.ALL })}
                onClick={() => setFilter(Sorting.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link',
                  { selected: filter === Sorting.ACTIVE })}
                onClick={() => setFilter(Sorting.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link',
                  { selected: filter === Sorting.COMPLETED })}
                onClick={() => setFilter(Sorting.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && (
        <div
          className="notification is-danger is-light has-text-weight-normal"
          // eslint-disable-line
        >
          <button
            type="button"
            className="delete"
            onClick={() => setError(false)}
          />

          {/* show only one message at a time */}
          Unable to add a todo
        </div>
      )}
    </div>
  );
};
