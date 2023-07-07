/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
// import { TodoList } from './TodoList';

const USER_ID = 10995;

type filterType = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [filterMethod, setFilterMethod] = useState<filterType>('All');
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setErr('Error: cannot upload todos'));
  }, []);

  useEffect(() => {
    let errorTimer: number;
    let hiddenTime: number;

    if (err) {
      hiddenTime = window.setTimeout(() => {
        setIsHidden(true);
      }, 2000);
      errorTimer = window.setTimeout(() => {
        setErr(null);
      }, 3000);
    }

    return () => {
      clearTimeout(errorTimer);
      clearTimeout(hiddenTime);
    };
  }, [err]);

  let visibleTodos = [...todos];

  switch (filterMethod) {
    case 'Completed':
      visibleTodos = [...visibleTodos].filter(todo => todo.completed === true);
      break;

    case 'Active':
      visibleTodos = [...visibleTodos].filter(todo => todo.completed !== true);
      break;

    case 'All':
      visibleTodos = [...visibleTodos];
      break;

    default:
      break;
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
            disabled
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
      </div>

      <section className="todoapp__main">
        <>
          {visibleTodos.map(todo => (
            <div className={`todo ${todo.completed && 'completed'}`} key={todo.id}>
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
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
        </>
      </section>

      {todos.length > 0 && (
        <footer className="todoapp__footer">
          <span className="todo-count">
            {todos.length}
            {' '}
            items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={`filter__link ${filterMethod === 'All' ? 'selected ' : ''}`}
              onClick={() => {
                setFilterMethod('All');
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${filterMethod === 'Active' ? 'selected ' : ''}`}
              onClick={() => {
                setFilterMethod('Active');
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${filterMethod === 'Completed' ? 'selected ' : ''}`}
              onClick={() => {
                setFilterMethod('Completed');
              }}
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

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {(err) && (
        <div className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: isHidden },
        )}>
          <button
            type="button"
            className="delete"
            onClick={() => {
              setErr(null)
            }}
          />
          {err}
        </div>
      )}
    </div>
  );
};
