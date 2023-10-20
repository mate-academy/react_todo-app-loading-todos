/* eslint-disable */
// @ts-nocheck
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import { UserWarning } from "./UserWarning";
import { client } from "./utils/fetchClient";
import { Todo } from "./types/Todo";
const USER_ID = 11694;

enum FILTER {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FILTER>(FILTER.ALL);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`).then((response) => {
      setTodos(response);
      setVisibleTodos(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (filter === FILTER.ALL) {
      setVisibleTodos(todos);
    } else if (filter === FILTER.ACTIVE) {
      setVisibleTodos(todos.filter((item) => !item.completed));
    } else if (filter === FILTER.COMPLETED) {
      setVisibleTodos(todos.filter((item) => item.completed));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, filter]);
  const setCompleted = (id: number) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, completed: true } : item
      )
    );
  };
  const clearCompleted = () => {
    setTodos(todos.filter((item) => !item.completed));
  };
  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodos([
      ...todos,
      {
        id: Math.ceil(Math.random() * 10000), // Will refactor in future
        userId: USER_ID,
        title: newTodo,
        completed: false,
      },
    ]);

    setNewTodo("");
  };

  const activateAll = () => {
    setTodos(todos.map((item) => ({ ...item, completed: true })));
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
          {visibleTodos.map((todo) => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={`todo ${todo.completed ? "completed" : ""}`}
            >
              <label
                className="todo__status-label"
                onClick={() => setCompleted(todo.id)}
              >
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
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
          ))}
        </section>

        {todos.length ? (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {visibleTodos.reduce(
                (acc: number, curr) => acc + Number(!curr.completed),
                0
              )}{" "}
              items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${
                  filter === FILTER.ALL ? "selected" : ""
                }`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(FILTER.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${
                  filter === FILTER.ACTIVE ? "selected" : ""
                }`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(FILTER.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${
                  filter === FILTER.COMPLETED ? "selected" : ""
                }`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(FILTER.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => clearCompleted()}
            >
              Clear completed
            </button>
          </footer>
        ) : undefined}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
