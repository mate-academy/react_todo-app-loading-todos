/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 11956;

enum StatusFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const isErrorWithMessage = (obj: any): obj is { message: string } => {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [
    errorNotification,
    setErrorNotification,
  ] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>(StatusFilter.All);

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Clear previous error notification
        setErrorNotification(null);

        const todoList = await getTodos(USER_ID);

        setTodos(todoList);
      } catch (error) {
        // console.error('Error fetching todos:', error);

        // Show error notification based on the error type
        if (isErrorWithMessage(error)) {
          // 'error' is now recognized as an object with a 'message' property
          const errorMessage = error.message;

          // Show error notification based on the error type
          if (errorMessage === 'Title should not be empty') {
            setErrorNotification('Title should not be empty');
          } else if (errorMessage === 'Unable to add a todo') {
            setErrorNotification('Unable to add a todo');
          } else if (errorMessage === 'Unable to delete a todo') {
            setErrorNotification('Unable to delete a todo');
          } else if (errorMessage === 'Unable to update a todo') {
            setErrorNotification('Unable to update a todo');
          } else {
            setErrorNotification('Unable to load todos');
          }
        } else {
          // Handle other types of errors
          setErrorNotification('An unknown error occurred');
        }
      }
    };

    // Fetch todos when the component mounts
    fetchTodos();

    // Clear error notification after 3 seconds
    const errorNotificationTimeout = setTimeout(() => {
      setErrorNotification(null);
    }, 3000);

    // Clear timeout on component unmount or before the next request
    return () => {
      clearTimeout(errorNotificationTimeout);
    };
  }, []);

  const filteredTodos = todos
    ? todos.filter((todo) => {
      if (filter === StatusFilter.All) {
        return true;
      }

      if (filter === StatusFilter.Active) {
        return !todo.completed;
      }

      return todo.completed;
    })
    : null;

  const incompleteTodosCount = todos
    ? todos.reduce(
      (count, todo) => (!todo.completed ? count + 1 : count), 0,
    )
    : 0;

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

          {filteredTodos && filteredTodos.map((todo: Todo) => {
            const { id, title, completed } = todo;

            return (
              <div
                data-cy="Todo"
                className={
                  classNames('todo',
                    {
                      completed,
                    })
                }
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}

          {/* This is a completed todo */}
          {/* <div data-cy="Todo" className="todo completed">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Completed Todo
            </span>

            {/* Remove button appears only on hover */}
          {/* <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}

          {/* overlay will cover the todo while it is being updated */}
          {/* <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div> */}
          {/* </div>  */}

          {/* This todo is not completed */}
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
              x
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is being edited */}
          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label> */}

          {/* This form is shown instead of the title and remove button */}
          {/* <form>
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
          </div> */}

          {/* This todo is in loadind state */}
          {/* <div data-cy="Todo" className="todo">
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
            </button> */}

          {/* 'is-active' class puts this modal on top of the todo */}
          {/* <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer
          className={classNames(
            'todoapp__footer',
            {
              hidden: incompleteTodosCount === 0,
            },
          )}
          data-cy="Footer"
        >
          {incompleteTodosCount > 0 && (
            <>
              <span className="todo-count" data-cy="TodosCounter">
                {`${incompleteTodosCount} ${incompleteTodosCount === 1 ? 'item' : 'items'} left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={
                    `filter__link
              ${filter === StatusFilter.All ? 'selected' : ''}
            `
                  }
                  data-cy="FilterLinkAll"
                  onClick={() => setFilter(StatusFilter.All)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={
                    `filter__link
              ${filter === StatusFilter.Active ? 'selected' : ''}
            `
                  }
                  data-cy="FilterLinkActive"
                  onClick={() => setFilter(StatusFilter.Active)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={
                    `filter__link
              ${filter === StatusFilter.Completed ? 'selected' : ''}
            `
                  }
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilter(StatusFilter.Completed)}
                >
                  Completed
                </a>
              </nav>

              {/* don't show this button if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </>
          )}
        </footer>

      </div>

      {/* Notification is shown in case of any error */}

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${errorNotification ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorNotification(null)}
        />
        {errorNotification}
      </div>

      {/* Add the 'hidden' class to hide the message smoothly */}
      {/* <br />
      <br />
      <br />
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button data-cy="HideErrorButton"
        type="button"
        className="delete" /> */}
      {/* show only one message at a time */}
      {/* Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div> */}

    </div>
  );
};
