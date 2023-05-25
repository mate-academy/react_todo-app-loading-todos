/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 10528;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [filter, setFilter] = useState('all');

  const loadTodos = useCallback(async () => {
    try {
      const data = await getTodos(USER_ID);

      setTodos(data);
    } catch (error) {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    } else if (filter === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    return filteredTodos;
  }, [filter, todos]);

  const filterAll = useCallback(() => {
    setFilter('all');
  }, []);

  const filterCompleted = useCallback(() => {
    setFilter('completed');
  }, []);

  const filterActive = useCallback(() => {
    setFilter('active');
  }, []);

  const handleCleanErrorMessage = () => {
    setHasError(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length
            ? <button type="button" className="todoapp__toggle-all active" />
            : ''}

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
          {visibleTodos.map(todo => {
            const {
              id, completed, title,
            } = todo;

            return (
              <div
                className={cn('todo', {
                  completed,
                })}
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                  />
                </label>

                <span className="todo__title">{title}</span>

                {/* Remove button appears only on hover */}
                <button type="button" className="todo__remove">×</button>

                {/* overlay will cover the todo while it is being updated */}
                {isLoading
                && (
                  <div className="modal overlay">
                    {/* eslint-disable-next-line max-len */}
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                )}
              </div>
            );
          })}

          {/* This todo is being edited */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is in loadind state */}
          <div className="todo">
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">Todo is being saved now</span>
            <button type="button" className="todo__remove">×</button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${todos.length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: filter === 'all',
              })}
              onClick={filterAll}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: filter === 'active',
              })}
              onClick={filterActive}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: filter === 'completed',
              })}
              onClick={filterCompleted}
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
      {hasError
      && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={handleCleanErrorMessage}
          />

          {/* show only one message at a time */}
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
