/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosService from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [onTodoHover, setOnTodoHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<string | null>(null);
  const [anyCompleted, setAnyCompleted] = useState(false);

  const handleOnHover = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.type === 'mouseover') {
      setOnTodoHover(true);
    } else if (event.type === 'mouseout') {
      setOnTodoHover(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    todosService
      .getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setAnyCompleted(todos.some(todo => todo.completed));
  }, [todos]);

  const filtredTodos = (filterQuery: string | null): Todo[] => {
    if (!filterQuery) {
      return todos;
    }

    if (filterQuery === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    if (filterQuery === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    return todos;
  };

  if (!todosService.USER_ID) {
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
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filtredTodos(filterBy).map(todo =>
            todo.completed ? (
              <div
                data-cy="Todo"
                className="todo completed"
                key={todo.id}
                onMouseOver={handleOnHover}
                onMouseOut={handleOnHover}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked
                  />
                </label>
                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                {onTodoHover && (
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>
                )}

                {isLoading && (
                  <div data-cy="TodoLoader" className="modal overlay">
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                )}
              </div>
            ) : (
              <div
                data-cy="Todo"
                className="todo"
                key={todo.id}
                onMouseOver={handleOnHover}
                onMouseOut={handleOnHover}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                {onTodoHover && (
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>
                )}
                {isLoading && (
                  <div data-cy="TodoLoader" className="modal overlay">
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                )}
              </div>
            ),
          )}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  'is-selected': filterBy === null,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterBy(null)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  'is-selected': filterBy === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterBy('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  'is-selected': filterBy === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterBy('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              disabled={!anyCompleted}
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
        className="notification is-danger is-light has-text-weight-normal hidden"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        Unable to load todos
        <br />
        Title should not be empty
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
