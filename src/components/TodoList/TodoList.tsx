import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';

interface Props {
  todos: Todo[];
  setStatus: (status: string) => void;
  status: string;
  setErrorMessage: (status: string) => void;
  errorMessage: string;
}

export const TodoList: React.FC<Props> = ({
  todos,
  setStatus,
  status,
  setErrorMessage,
  errorMessage,
}) => {
  const visibleTodos = todos.filter(todo => {
    if (status === 'active') {
      return !todo.completed;
    }

    if (status === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const todosLeft = todos.reduce(
    (count, todo) => (todo.completed ? count : count + 1),
    0,
  );

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
          {visibleTodos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}

          {/* This todo is being edited */}
          {/* <div data-cy="Todo" className="todo">
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
            </button>

            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
        </section>

        {/* Footer */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosLeft} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${status === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setStatus('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${status === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setStatus('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${status === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setStatus('completed')}
              >
                Completed
              </a>
            </nav>

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

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')} />
        {errorMessage}
      </div>

      {/*
        Unable to load todos
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
