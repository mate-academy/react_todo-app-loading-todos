/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  ChangeEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Status } from './types/Status';
import { ErrorMessages } from './types/ErrorMessages';

const USER_ID = 11217;

const filterTodos = (todos: Todo[], selectedStatus: Status) => {
  let filteredTodos = [...todos];

  switch (selectedStatus) {
    case Status.Completed:
      filteredTodos = filteredTodos.filter((todo: Todo) => todo.completed);
      break;
    case Status.Active:
      filteredTodos = filteredTodos.filter((todo: Todo) => !todo.completed);
      break;
    default:
      break;
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.All);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<ErrorMessages | null>(null);
  const timerRef = useRef<number | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  const filteredTodos = useMemo(
    () => filterTodos(todos, selectedStatus),
    [selectedStatus, todos],
  );

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, [todos, isEditable]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const showError = () => {
    setError(ErrorMessages.Add);

    // Clear the existing timer, if any
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer to auto-hide the error message after 3 seconds
    timerRef.current = window.setTimeout(() => {
      setError(null);
    }, 3000);
  };

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
              value={query}
              onChange={handleInputChange}
            />
          </form>
        </header>

        {
          todos.length !== 0 && (
            <>
              <section className="todoapp__main">
                {
                  filteredTodos.map(todo => (
                    <>
                      <div className={classNames('todo',
                        todo.completed ? 'completed' : '')}
                      >
                        <label className="todo__status-label">
                          <input
                            type="checkbox"
                            className="todo__status"
                            checked
                          />
                        </label>

                        {
                          isEditable ? (
                            <form>
                              <input
                                type="text"
                                className="todo__title-field"
                                // placeholder="Empty todo will be deleted"
                                // value={}
                                // onChange={}
                                onBlur={() => setIsEditable(false)}
                                autoFocus
                              />
                            </form>
                          ) : (
                            <>
                              <span
                                className="todo__title"
                                onDoubleClick={() => {
                                  setIsEditable(true);
                                }}
                              >
                                {todo.title}
                              </span>

                              <button type="button" className="todo__remove">
                                ×
                              </button>
                            </>
                          )
                        }

                        {/* overlay will cover the todo while it is being updated */}
                        <div className="modal overlay">
                          <div
                            className="
                            modal-background has-background-white-ter
                            "
                          />
                          <div className="loader" />
                        </div>
                      </div>
                    </>
                  ))
                }

                {/* This todo is in loadind state */}
                <div className="todo">
                  <label className="todo__status-label">
                    <input type="checkbox" className="todo__status" />
                  </label>

                  <span className="todo__title">Todo is being saved now</span>
                  <button type="button" className="todo__remove">×</button>

                  {/* 'is-active' class puts this modal on top of the todo */}
                  <div className="modal overlay is-active">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              </section>

              <footer className="todoapp__footer">
                <span className="todo-count">
                  3 items left
                </span>

                <nav className="filter">
                  <a
                    href="#/"
                    className={classNames('filter__link',
                      selectedStatus === Status.All && 'selected')}
                    onClick={() => setSelectedStatus(Status.All)}
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    className={classNames('filter__link',
                      selectedStatus === Status.Active && 'selected')}
                    onClick={() => setSelectedStatus(Status.Active)}
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    className={classNames('filter__link',
                      selectedStatus === Status.Completed && 'selected')}
                    onClick={() => setSelectedStatus(Status.Completed)}
                  >
                    Completed
                  </a>
                </nav>

                <button type="button" className="todoapp__clear-completed">
                  {
                    filteredTodos.find(todo => todo.completed) && (
                      'Clear completed'
                    )
                  }
                </button>

              </footer>
            </>
          )
        }

      </div>

      {
        true && (
          <div
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              type="button"
              className="delete hidden"
              onClick={showError}
            />
            {error}
          </div>
        )
      }
    </div>
  );
};
