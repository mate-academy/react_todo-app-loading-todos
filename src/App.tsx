/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

type Props = {
  todo: Todo[];
};

export const App: React.FC<Props> = () => {
  enum Filter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
  }

  enum ErrorMessage {
    Load = 'Unable to load todos',
    Add = 'Unable to add a todo',
    Delete = 'Unable to delete a todo',
    Update = 'Unable to update a todo',
    TitleEmpty = 'Title should not be empty',
  }

  const filters: { type: Filter; label: string }[] = [
    { type: Filter.All, label: 'All' },
    { type: Filter.Active, label: 'Active' },
    { type: Filter.Completed, label: 'Completed' },
  ];

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  // const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>();
  const field = useRef<HTMLInputElement>(null);
  const activeTodos = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    // setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.Load));
    // .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    field.current?.focus();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const filteredTodos = todos.filter(item => {
    if (filter === 'active') {
      return !item.completed;
    }

    if (filter === 'completed') {
      return item.completed;
    }

    return true; // 'all'
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
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
              ref={field}
            />
          </form>
        </header>
        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {/* This is a completed todo */}
            {filteredTodos.map(tod => (
              <div
                data-cy="Todo"
                className={`todo ${tod.completed ? 'completed' : ''}`}
                key={tod.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={tod.completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {tod.title}
                </span>

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
            {/* This todo is an active todo */}
            {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Not Completed Todo
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos} items left
            </span>

            {/* Active link should have the 'selected' class */}
            {filters.map(({ type, label }) => (
              <a
                key={type}
                href={`#/${type}`}
                className={`filter__link ${filter === type ? 'selected' : ''}`}
                data-cy={
                  type === Filter.All
                    ? 'FilterLinkAll'
                    : type === Filter.Active
                      ? 'FilterLinkActive'
                      : 'FilterLinkCompleted'
                }
                onClick={e => {
                  e.preventDefault();
                  setFilter(type);
                }}
              >
                {label}
              </a>
            ))}

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
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
        className={`notification is-danger is-light has-text-weight-normal ${errorMessage ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
