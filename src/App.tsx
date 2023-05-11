/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { getAllTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { Filters } from './utils/enums';

const USER_ID = 10306;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hasErrorMessage, setHasErrorMessage] = useState(true);
  const [addError, setAddError] = useState(false);
  const [deleteError] = useState(false);
  const [updateError] = useState(false);

  useEffect(() => {
    getAllTodos(USER_ID)
      .then(setTodos);
  }, []);

  const handleFilterSelection = useCallback((value: string) => {
    setSelectedFilter(value);
  }, []);

  if (!USER_ID) {
    setAddError(true);
    setTimeout(() => {
      setAddError(false);
    }, 3000);
    setHasErrorMessage(true);

    return <UserWarning />;
  }

  const isAnyError = addError || deleteError || updateError;

  const visibleTodos = todos.filter(({ completed }) => {
    switch (selectedFilter) {
      case Filters.All:
        return true;

      case Filters.Active:
        return !completed;

      case Filters.Completed:
        return completed;

      default:
        return 0;
    }
  });

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
          {/* <div className="todo completed">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span className="todo__title">Completed Todo</span> */}

          {/* Remove button appears only on hover */}
          {/* <button type="button" className="todo__remove">×</button> */}

          {/* overlay will cover the todo while it is being updated */}
          {/* <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div> */}

          {/* This todo is not completed */}
          {visibleTodos.map(todo => (
            <div className={cn(
              'todo',
              { completed: todo.completed },
            )}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span className="todo__title">{todo.title}</span>
              <button type="button" className="todo__remove">×</button>

              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
          {/* <div className="todo">
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
          </div> */}

          {/* This todo is being edited */}
          {/* <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label> */}

          {/* This form is shown instead of the title and remove button */}
          {/* <form>
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
        </div> */}

          {/* This todo is in loadind state */}
          {/* <div className="todo">
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">Todo is being saved now</span>
            <button type="button" className="todo__remove">×</button> */}

          {/* 'is-active' class puts this modal on top of the todo */}
          {/* <div className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div> */}
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
              className={cn(
                'filter__link',
                { selected: selectedFilter === Filters.All },
              )}
              onClick={() => handleFilterSelection(Filters.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn(
                'filter__link',
                { selected: selectedFilter === Filters.Active },
              )}
              onClick={() => handleFilterSelection(Filters.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn(
                'filter__link',
                { selected: selectedFilter === Filters.Completed },
              )}
              onClick={() => handleFilterSelection(Filters.Completed)}
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
