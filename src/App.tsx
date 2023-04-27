/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';

enum TypeFilterin {
  All = 'all',
  Completed = 'comleted',
  Active = 'active',
}

const USER_ID = 9940;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [typeOfFiltering, setTypeOfFiltering] = useState('all');
  const [dataError, setError] = useState<Error | null>(null);
  const [closeErrorButton, setCloseErrorButton] = useState(false);
  const [hideError, setHideError] = useState(false);

  const getTodos = () => {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
  };

  useEffect(() => {
    switch (typeOfFiltering) {
      case TypeFilterin.Active:
        return setVisibleTodos([...todos]
          .filter(todo => !todo.completed));
      case TypeFilterin.Completed:
        return setVisibleTodos([...todos]
          .filter(todo => todo.completed));
      case TypeFilterin.All:
      default:
        return setVisibleTodos([...todos]);
    }
  }, [typeOfFiltering]);

  const fetchData = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setVisibleTodos(todosFromServer);
    } catch (error) {
      setError(new Error());
      setTimeout(() => {
        setHideError(true);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchData();
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

        {visibleTodos && (
          <section className="todoapp__main">
            {visibleTodos.map((todo:Todo) => (
              <div
                key={todo.id}
                className={
                  classNames('todo', { completed: todo.completed })
                }
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    name="complete"
                    id={todo.id.toString()}
                  />
                </label>

                <span className="todo__title">{todo.title}</span>

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being updated */}
                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {visibleTodos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${visibleTodos.filter(todo => todo.completed === false).length} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={
                  classNames(
                    'filter__link',
                    { selected: typeOfFiltering === TypeFilterin.All },
                  )
                }
                onClick={() => setTypeOfFiltering(TypeFilterin.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={
                  classNames(
                    'filter__link',
                    { selected: typeOfFiltering === TypeFilterin.Active },
                  )
                }
                onClick={() => setTypeOfFiltering(TypeFilterin.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={
                  classNames(
                    'filter__link',
                    { selected: typeOfFiltering === TypeFilterin.Completed },
                  )
                }
                onClick={() => setTypeOfFiltering(TypeFilterin.Completed)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {(dataError && !hideError) && (
        <div className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: closeErrorButton },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setCloseErrorButton(!closeErrorButton)}
          />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
