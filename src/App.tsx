/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { UserWarning } from './UserWarning';

const USER_ID = 118;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [notification, setNotification] = useState<string | null>(null);

const showNotification = (message: string) => {
  setNotification(message);

  setTimeout(() => {
    setNotification(null);
  }, 3000);
};

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    getTodos(USER_ID)
      .then((data) => setTodos(data))
      .catch(() => showNotification('Unable to load todos'));
  }, []); // Empty dependency array to mimic componentDidMount

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  const handleTodoDelete = (todoId: number) => {
    client.delete(`/todos/${todoId}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        showNotification('Todo deleted successfully');
      })
      .catch(() => showNotification('Unable to delete todo'));
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filterStatus) {
      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return true;
    }
  });

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
          {filteredTodos.map((todo) => (
            <div key={todo.id} data-cy="Todo" className={`todo${todo.completed ? ' completed' : ''}`}>
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
                onClick={() => handleTodoDelete(todo.id)}
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

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${filterStatus === 'All' ? 'selected' : ''}`}
              data-cy="FilterLinkAll"
              onClick={() => handleFilterChange('All')}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${filterStatus === 'Active' ? 'selected' : ''}`}
              data-cy="FilterLinkActive"
              onClick={() => handleFilterChange('Active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${filterStatus === 'Completed' ? 'selected' : ''}`}
              data-cy="FilterLinkCompleted"
              onClick={() => handleFilterChange('Completed')}
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
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${notification ? '' : 'hidden'}`}
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
