/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, postTodos } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 10327;

export const App: React.FC = () => {
  const [todoItem, setTodoItem] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = () => getTodos(USER_ID).then(setTodos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const createTodo = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const newTodo = {
      userId: USER_ID,
      title: todoItem,
      completed: false,
    };

    postTodos(USER_ID, newTodo);
    fetchTodos();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form
            onSubmit={createTodo}
          >
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoItem}
              onChange={event => setTodoItem(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {todos.map((todo) => (
            <div
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span className="todo__title">{todo.title}</span>

              <button
                type="button"
                className="todo__remove"
              >
                ×
              </button>

              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
          {/* This is a completed todo */}
          {/* <div className="todo completed">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked
              />
            </label> */}

          {/* <span className="todo__title">Completed Todo</span> */}

          {/* Remove button appears only on hover */}
          {/* <button type="button" className="todo__remove">×</button> */}

          {/* overlay will cover the todo while it is being updated */}
          {/* <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div> */}
          {/* </div> */}

          {/* This todo is not completed */}
          {/* <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label> */}

          {/* <span className="todo__title">Not Completed Todo</span>
          <button type="button" className="todo__remove">×</button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div> */}
          {/* </div> */}

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
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a href="#/" className="filter__link selected">
              All
            </a>

            <a href="#/active" className="filter__link">
              Active
            </a>

            <a href="#/completed" className="filter__link">
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
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
