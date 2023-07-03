/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

const filterLinks = [
  { name: 'All', way: '' },
  { name: 'Active', way: 'active' },
  { name: 'Completed', way: 'completed' },
];

const USER_ID = 10905;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState('All');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectedTodos = (todosSelected: string) => {
    setSelectedTodos(todosSelected);
  };

  const handleDeleteError = () => {
    setIsError(false);
  };

  const filterTodos = (filterTodosBy: string) => {
    switch (filterTodosBy) {
      case 'Active':
        return todos.filter(todo => !todo.completed);

      case 'Completed':
        return todos.filter(todo => todo.completed);

      case 'All':
      default:
        return todos;
    }
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((res) => {
        setTodos(res);
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage('Unable to load todos');
        setTimeout(() => setIsError(false), 3000);
      });
  }, []);

  const visibleTodos = filterTodos(selectedTodos);
  const todosLeftToFinish = filterTodos('Active');

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              {visibleTodos.map(todo => (
                <div
                  className={classNames('todo', {
                    completed: todo.completed,
                  })}
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
                    <div
                      className="modal-background has-background-white-ter"
                    />
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
                </label>

                <span className="todo__title">Completed Todo</span>

                // Remove button appears only on hover
                <button type="button" className="todo__remove">×</button>

                // overlay will cover the todo while it is being updated
                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div> */}

              {/* This todo is not completed */}
              {/* <div className="todo">
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                  />
                </label>

                <span className="todo__title">Not Completed Todo</span>
                <button type="button" className="todo__remove">×</button>

                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div> */}

              {/* This todo is being edited */}
              {/* <div className="todo">
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                  />
                </label>

                // This form is shown instead of the title and remove button
                <form>
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

              {/* This todo is in loadind state */}
              {/* <div className="todo">
                <label className="todo__status-label">
                  <input type="checkbox" className="todo__status" />
                </label>

                <span className="todo__title">Todo is being saved now</span>
                <button type="button" className="todo__remove">×</button>

                // 'is-active' class puts this modal on top of the todo *
                <div className="modal overlay is-active">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div> */}
            </section>

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${todosLeftToFinish.length} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter">
                {filterLinks.map(link => (
                  <a
                    href={`#/${link.way}`}
                    className={classNames('filter__link', {
                      selected: link.name === selectedTodos,
                    })}
                    onClick={() => handleSelectedTodos(link.name)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !isError },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={handleDeleteError}
        />
        {errorMessage}
        {/* 'Unable to add a todo' */}
        {/* 'Unable to update a todo' */}
        {/* 'Unable to delete a todo' */}
      </div>
    </div>
  );
};
