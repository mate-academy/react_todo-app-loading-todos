/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 10284;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState('All');
  const [hasError, setHasError] = useState(false);

  const loadTodos = async () => {
    try {
      const todoList = await getTodos(USER_ID);

      setTodos(todoList);
    } catch {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (sort) {
      case 'Active': return !todo.completed;
      case 'Completed': return todo.completed;
      default: return todos;
    }
  });

  const visibleTodos = filteredTodos;

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
            <button
              type="button"
              className="todoapp__toggle-all active"
            />
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
              className={classNames('todo',
                { completed: todo.completed })}
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
                <div
                  className="modal-background has-background-white-ter"
                />
                <div className="loader" />
              </div>
            </div>
          ))}

          {/* This is a completed todo
                <div className="todo completed">
                  <label className="todo__status-label">
                    <input
                      type="checkbox"
                      className="todo__status"
                      checked
                    />
                  </label>

                  <span className="todo__title">Completed Todo</span>

                  Remove button appears only on hover
                  <button type="button" className="todo__remove">×</button>

                  overlay will cover the todo while it is being updated
                  <div className="modal overlay">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>

                This todo is not completed
                <div className="todo">
                  <label className="todo__status-label">
                    <input
                      type="checkbox"
                      className="todo__status"
                    />
                  </label>

                  <span className="todo__title">Not Completed Todo</span>
                  <button type="button" className="todo__remove">×</button>

                  <div className="modal overlay">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>

                This todo is being edited
                <div className="todo">
                  <label className="todo__status-label">
                    <input
                      type="checkbox"
                      className="todo__status"
                    />
                  </label>

                  This form is shown instead of the title and remove button
                  <form>
                    <input
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value="Todo is being edited now"
                    />
                  </form>

                  <div className="modal overlay">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>

                This todo is in loadind state
                <div className="todo">
                  <label className="todo__status-label">
                    <input type="checkbox" className="todo__status" />
                  </label>

                  <span className="todo__title">Todo is being saved now</span>
                  <button type="button" className="todo__remove">×</button>

                  is-active class puts this modal on top of the todo
                  <div className="modal overlay is-active">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
                */}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link',
                  { selected: sort === 'All' })}
                onClick={() => setSort('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link',
                  { selected: sort === 'Active' })}
                onClick={() => setSort('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link',
                  { selected: sort === 'Completed' })}
                onClick={() => setSort('Completed')}
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
      {hasError && (
        <div
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            type="button"
            className="delete"
            onClick={() => setHasError(false)}
          />
          Unable to load todos
        </div>
      )}

    </div>
  );
};
