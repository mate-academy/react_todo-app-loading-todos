/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11825;

type FilterBy = 'All' | 'Active' | 'Completed';
type ErrorMessage =
'' |
'Unable to load todos' |
'Title should not be empty' |
'Unable to add a todo' |
'Unable to delete a todo' |
'Unable to update a todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>('All');
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      })
      .catch((error) => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
        throw error;
      });
  }, []);

  const handleFilterAll = () => {
    setFilteredTodos(todos);
    setFilterBy('All');
  };

  const handleFilterActive = () => {
    setFilteredTodos(todos.filter(todo => !todo.completed));
    setFilterBy('Active');
  };

  const handleFilterCompleted = () => {
    setFilteredTodos(todos.filter(todo => todo.completed));
    setFilterBy('Completed');
  };

  const handleErrorMessage = () => {
    setErrorMessage('');
  };

  const countActiveTodos = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    return activeTodos.length;
  };

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

          {filteredTodos?.map(todo => (
            <div
              data-cy="Todo"
              className={cn('todo', {
                completed: todo.completed,
              })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  defaultChecked={todo.completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>
            </div>
          ))}

          {todos?.length && (
            // Hide the footer if there are no todos
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${countActiveTodos()} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              {/* {Object.keys(Filters).map(filterCategory => (
                <a
                  href="#/"
                  className="filter is-capitalized"
                  data-cy="Filter"
                >
                  {filterCategory}
                </a>
              ))} */}

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={cn('filter__link', {
                    selected: filterBy === 'All',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={handleFilterAll}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={cn('filter__link', {
                    selected: filterBy === 'Active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={handleFilterActive}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={cn('filter__link', {
                    selected: filterBy === 'Completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={handleFilterCompleted}
                >
                  Completed
                </a>
              </nav>

              {true && (
                <button
                  type="button"
                  className={cn('todoapp__clear-completed', {
                    'is-invisible': true,
                  })}
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              )}

              {/* don't show this button if there are no completed todos */}

            </footer>
          )}

        </section>

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
          </span> */}

        {/* Remove button appears only on hover */}
        {/* <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button> */}

        {/* overlay will cover the todo while it is being updated */}
        {/* <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div> */}
      </div>

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
          ×
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
      </form> */}

      {/* <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div> */}

      {/* This todo is in loadind state
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
        </button> */}

      {/* 'is-active' class puts this modal on top of the todo */}
      {/* <div data-cy="TodoLoader" className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div> */}
      {/* </section> */}

      {/* Hide the footer if there are no todos */}
      {/* <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          3 items left
        </span> */}

      {/* Active filter should have a 'selected' class */}
      {/* <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className="filter__link selected"
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav> */}

      {/* don't show this button if there are no completed todos */}
      {/* <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed */}
      {/* </button>
    </footer> */}
      {/*
      </div>
      */}
      {/*
      Notification is shown in case of any error
      */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        /* eslint-disable max-len */
        className={cn('notification is-danger is-light has-text-weight-normal', {
          hidden: !errorMessage,
        })}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleErrorMessage}
        />
        {errorMessage}
      </div>

      {/* <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
        /> */}
      {/* show only one message at a time */}
      {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
      {/* {errorMessage}
    </div> */}
    </div>
  );
};
