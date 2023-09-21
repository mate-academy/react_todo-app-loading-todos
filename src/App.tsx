/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import { Todo } from "./types/Todo";
import { getTodos } from "./api/todos";

const USER_ID = 11546;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"All" | "Active" | "Completed">(
    "All"
  );

  const filterTodos = (
    todos: Todo[],
    filterStatus: "All" | "Active" | "Completed"
  ) => {
    return todos.filter((todo) => {
      if (filterStatus === "All") {
        return true;
      } else if (filterStatus === "Active") {
        return !todo.completed;
      } else {
        return todo.completed;
      }
    });
  };

  const changeFilterStatus = (type: "All" | "Active" | "Completed") => {
    setFilterType(type);
  };

  useEffect(() => {
    setError(null);
    if (USER_ID) {
      getTodos(USER_ID)
        .then((todos) => {
          setTodos(todos);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, []);

  const closeError = () => {
    setError(null);
  };

  const autoCloseError = () => {
    setTimeout(() => {
      closeError();
    }, 3000);
  };

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
          {/* This is a completed todo */}
          {/* <div data-cy="Todo" className="todo completed"> */}
          {/* <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked
              />
            </label> */}

          {/* <span data-cy="TodoTitle" className="todo__title">
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
            </div>
          </div> */}

          {filterTodos(todos, filterType).map((todo) => (
            <div
              data-cy="Todo"
              className={`todo ${todo.completed ? "completed" : ""}`}
              key={todo.id}
            >
              {/* Render todo content here */}
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

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}

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

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              3 items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                onClick={() => changeFilterStatus("All")}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                onClick={() => changeFilterStatus("Active")}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                onClick={() => changeFilterStatus("Completed")}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {todos.filter((todo) => todo.completed).length > 0 && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {error && (
        <div
          data-cy="ErrorNotification"
          className={`notification is-danger is-light has-text-weight-normal ${
            error ? "" : "hidden"
          }`}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={closeError}
          />
          {error}
        </div>
      )}
    </div>
  );
};
