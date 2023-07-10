/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo, TodoStatus } from './types/Todo';

const USER_ID = 11033;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosContainer, setTodosContainer] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(TodoStatus.All);
  const [errorMessage] = useState('');

  const filterByStatus = (status: TodoStatus) => {
    const filtered = todosContainer.filter(todo => {
      switch (status) {
        case TodoStatus.Active:
          return !todo.completed;
        case TodoStatus.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    setTodos(filtered);
    setSelectedStatus(status);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((res) => {
        setTodos(res);
        setTodosContainer(res);
        setCompletedTodos(res.filter(todo => todo.completed));
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length > 0 && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {todos.map(todo => (
            <div
              className={classNames('todo', { completed: todo.completed })}
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
              <button type="button" className="todo__remove">×</button>

              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todosContainer.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {todosContainer.length - completedTodos.length} items left
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: selectedStatus === TodoStatus.All,
                })}
                onClick={() => filterByStatus(TodoStatus.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: selectedStatus === TodoStatus.Active,
                })}
                onClick={() => filterByStatus(TodoStatus.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selectedStatus === TodoStatus.Completed,
                })}
                onClick={() => filterByStatus(TodoStatus.Completed)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              disabled={completedTodos.length === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <div className={
          classNames('notification is-danger is-light has-text-weight-normal',
            {
              hidden: errorMessage.length !== 0,
            })
        }
        >
          <button type="button" className="delete" />

          {errorMessage}
        </div>
      )}
    </div>
  );
};
