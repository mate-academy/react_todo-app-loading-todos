/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import cn from 'classnames';
import {
  getAllTodos,
  getActiveTodos,
  getCompletedTodos,
} from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 1;

export const App: React.FC = () => {
  const [, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hasErrorMessage, setHasErrorMessage] = useState(true);
  const [addError, setAddError] = useState(false);
  const [deleteError] = useState(false);
  const [updateError] = useState(false);

  if (!USER_ID) {
    setAddError(true);
    setTimeout(() => {
      setAddError(false);
    }, 3000);
    setHasErrorMessage(true);

    return <UserWarning />;
  }

  const isAnyError = addError || deleteError || updateError;

  const showAllTodos = async () => {
    setSelectedFilter('All');
    setTodos(await getAllTodos(USER_ID));
  };

  const showActiveTodos = async () => {
    setSelectedFilter('Active');
    setTodos(await getActiveTodos(USER_ID));
  };

  const showCompletedTodos = async () => {
    setSelectedFilter('Completed');
    setTodos(await getCompletedTodos(USER_ID));
  };

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
          {/* This is a completed todo */}
          <div className="todo completed">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span className="todo__title">Completed Todo</span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove">×</button>

            {/* overlay will cover the todo while it is being updated */}
            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is not completed */}
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
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

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
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={cn(
                'filter__link',
                { selected: selectedFilter === 'All' },
              )}
              onClick={showAllTodos}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn(
                'filter__link',
                { selected: selectedFilter === 'Active' },
              )}
              onClick={showActiveTodos}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn(
                'filter__link',
                { selected: selectedFilter === 'Completed' },
              )}
              onClick={showCompletedTodos}
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
      {isAnyError && (
        <div className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: hasErrorMessage },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setHasErrorMessage(false)}
          />

          {/* show only one message at a time */}
          {(addError && 'Unable to add a todo')
          || (deleteError && 'Unable to delete a todo')
          || (updateError && 'Unable to update a todo')}
        </div>
      )}
    </div>
  );
};
