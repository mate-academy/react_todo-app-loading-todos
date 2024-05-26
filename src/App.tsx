/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorsEnum } from './utils/ErrorsEnum';
import { FiltersEnum } from './utils/FiltersEnum';

export const App: React.FC = () => {
  const [todoList, setTodosList] = useState<Todo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);
  const [selectedFilter, setSelecetedFilter] = useState<FiltersEnum>(
    FiltersEnum.All,
  );
  const [error, setError] = useState<ErrorsEnum | null>(null);

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosList(todos);
        setFilteredTodoList(todos);
      })
      .catch(() => {
        setError(ErrorsEnum.UNABLE_LOAD_TODOS);
        setTimeout(() => setError(null), 3000);
      });
  }, []);

  useEffect(() => {
    const filteredTodos = todoList.filter(todo => {
      switch (selectedFilter) {
        case FiltersEnum.Active:
          return !todo.completed;
        case FiltersEnum.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    setFilteredTodoList(filteredTodos);
  }, [selectedFilter, todoList]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSelectFilter = (filter: FiltersEnum) => {
    setSelecetedFilter(filter);
  };

  const handleCloseError = () => {
    setError(null);
  };

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
          {/* This is a completed todo */}
          {/* <div data-cy="Todo" className="todo completed">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Completed Todo
            </span> */}

          {/* Remove button appears only on hover */}
          {/* <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}

          {/* overlay will cover the todo while it is being deleted or updated */}
          {/* <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {filteredTodoList.map(todo => (
            <>
              {/* This todo is an active todo */}
              <div
                data-cy="Todo"
                className={`todo ${todo.completed ? 'completed' : ''}`}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
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

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            </>
          ))}

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
        {todoList.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todoList.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${selectedFilter === FiltersEnum.All ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => {
                  handleSelectFilter(FiltersEnum.All);
                }}
              >
                {FiltersEnum.All}
              </a>

              <a
                href="#/active"
                className={`filter__link ${selectedFilter === FiltersEnum.Active ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => {
                  handleSelectFilter(FiltersEnum.Active);
                }}
              >
                {FiltersEnum.Active}
              </a>

              <a
                href="#/completed"
                className={`filter__link ${selectedFilter === FiltersEnum.Completed ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  handleSelectFilter(FiltersEnum.Completed);
                }}
              >
                {FiltersEnum.Completed}
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

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleCloseError}
        />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
