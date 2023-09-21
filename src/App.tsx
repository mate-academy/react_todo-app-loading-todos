/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { Todo } from "./types/Todo";
import { addTodo, getTodos } from "./api/todos";
import { TodoList } from "./components/TodoList";

const USER_ID = 11503;

enum FilterOption {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterOption.All);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage("Unable to load todos"));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (filter) {
        case FilterOption.Active:
          return !completed;
        case FilterOption.Completed:
          return completed;
        case FilterOption.All:
        default:
          return true;
      }
    });
  }, [filter, todos]);

  const activeTodos = useMemo(() => {
    return todos.filter(({ completed }) => !completed);
  }, [todos]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [errorMessage]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {!!filteredTodos.length && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={addTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!!filteredTodos.length && <TodoList todos={filteredTodos} />}

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos.length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              {Object.values(FilterOption).map((option) => (
                <a
                  key={option}
                  data-cy={`FilterLink${option}`}
                  href={`#/${option.toLowerCase()}`}
                  className={classNames("filter__link", {
                    selected: option === filter,
                  })}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </a>
              ))}
            </nav>

            {/* don't show this button if there are no completed todos */}
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

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          "notification is-danger is-light has-text-weight-normal",
          { hidden: !errorMessage }
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage("")}
        />
        {errorMessage}
        {/* show only one message at a time */}
        {/*
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
