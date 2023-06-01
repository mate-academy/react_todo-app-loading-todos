/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';

type TodoStatus = 'all' | 'active' | 'completed';

const USER_ID = 10595;

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [status, setStatus] = useState<TodoStatus>('all');
  const [itemsLeft, setItemsLeft] = useState(0);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodosList(response);
        setVisibleTodos(response);
        setItemsLeft(response.filter(todo => todo.completed === false).length);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleFilterTodos = (newStatus: TodoStatus) => {
    setStatus(newStatus);

    switch (newStatus) {
      case 'completed':
        setVisibleTodos(todosList.filter(todo => todo.completed === true));
        break;
      case 'active':
        setVisibleTodos(todosList.filter(todo => todo.completed === false));
        break;
      default:
        setVisibleTodos(todosList);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todosList.length > 0
            && <button type="button" className="todoapp__toggle-all" />}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todosList.length > 0 && (
          <>
            <section className="todoapp__main">
              {visibleTodos.map(todo => {
                const { completed, id, title } = todo;

                return (
                  <div className={`todo ${completed ? 'completed' : ''}`} key={id}>
                    <label className="todo__status-label">
                      <input
                        type="checkbox"
                        className="todo__status"
                        checked={completed}
                      />
                    </label>

                    <span className="todo__title">{title}</span>

                    <button type="button" className="todo__remove">×</button>

                    <div className="modal overlay">
                      <div className="modal-background
                      has-background-white-ter"
                      />
                      <div className="loader" />
                    </div>
                  </div>
                );
              })}
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${itemsLeft} items left`}
              </span>

              <nav className="filter">
                <a
                  href="#/"
                  className={`filter__link ${status === 'all' ? 'selected' : ''}`}
                  onClick={
                    () => handleFilterTodos('all')
                  }
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={`filter__link ${status === 'active' ? 'selected' : ''}`}
                  onClick={
                    () => handleFilterTodos('active')
                  }
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={`filter__link ${status === 'completed' ? 'selected' : ''}`}
                  onClick={
                    () => handleFilterTodos('completed')
                  }
                >
                  Completed
                </a>
              </nav>

              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {isError && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setIsError(false)}
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
