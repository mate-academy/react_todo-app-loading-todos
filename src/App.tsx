/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import cN from 'classnames';

type Filter = 'All' | 'Completed' | 'Active';

function filterTodos(todos: Todo[], completedStatus: boolean) {
  return todos.filter(todo => todo.completed === completedStatus);
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [activeCount, setActiveCount] = useState<number>(0);
  const addTodoField = useRef<HTMLInputElement>(null);

  function ShowError(message: string) {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  }

  useEffect(() => {
    if (todos.length !== 0) {
      setIsAllCompleted(!todos.some(todo => todo.completed === false));
      setHasCompleted(todos.some(todo => todo.completed === true));
      setActiveCount(
        todos.reduce((acc, todo) => {
          if (todo.completed === false) {
            return acc + 1;
          }

          return acc;
        }, 0),
      );
    }
  }, [todos]);

  useEffect(() => {
    client
      .get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setFilteredTodos(fetchedTodos);
        if (addTodoField.current !== null) {
          addTodoField.current.focus();
        }
      })
      .catch(() => ShowError('Unable to load todos'));
  }, []);

  function handleFilterAll() {
    setFilteredTodos(todos);
    setActiveFilter('All');
  }

  function handleFilterActive() {
    setFilteredTodos(filterTodos(todos, false));
    setActiveFilter('Active');
  }

  function handleFilterCompleted() {
    setFilteredTodos(filterTodos(todos, true));
    setActiveFilter('Completed');
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed +++*/}
          <button
            type="button"
            className={cN('todoapp__toggle-all', { active: isAllCompleted })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit -*/}
          <form>
            <input
              ref={addTodoField}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => {
            const { title, id, completed } = todo;

            return (
              <div
                key={id}
                data-cy="Todo"
                className={cN('todo', { completed })}
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
        </section>

        {false && (
          <section className="todoapp__main" data-cy="TodoList">
            {/* This is a completed todo +*/}
            <div data-cy="Todo" className="todo completed">
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

              {/* Remove button appears only on hover ок*/}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated ок*/}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>

            {/* This todo is an active todo +*/}
            <div data-cy="Todo" className="todo">
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

            {/* This todo is being edited -*/}
            <div data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              {/* This form is shown instead of the title and remove button -*/}
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

            {/* This todo is in loadind state -*/}
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

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* 'is-active' class puts this modal on top of the todo --- */}
              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          </section>
        )}
        {/* Hide the footer if there are no todos +++*/}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

            {/* Active link should have the 'selected' class +++*/}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cN('filter__link', {
                  selected: activeFilter === 'All',
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleFilterAll()}
              >
                All
              </a>

              <a
                href="#/active"
                className={cN('filter__link', {
                  selected: activeFilter === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleFilterActive()}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cN('filter__link', {
                  selected: activeFilter === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilterCompleted()}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos +++*/}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification +++*/}
      {/* Add the 'hidden' class to hide the message smoothly +++*/}
      <div
        data-cy="ErrorNotification"
        className={cN(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          onClick={() => setErrorMessage(null)}
          data-cy="HideErrorButton"
          type="button"
          className="delete"
        />
        {/* show only one message at a time +++*/}
        {errorMessage}
        {/* Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
