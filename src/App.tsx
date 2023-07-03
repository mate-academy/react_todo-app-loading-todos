/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Message } from './components/ErrorMessage';

const USER_ID = 10910;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedNav, setSelectedNav] = useState('All');
  const [visibleError, setVisibleError] = useState('');

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setVisibleError('Unable to load a todos'));
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let visibleTodos = useMemo<Todo[]>(() => todos, [todos]);

  switch (selectedNav) {
    case 'Active':
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
      break;

    case 'Completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
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

        <section className="todoapp__main">
          {visibleTodos.map(todo => (
            <div className="todo" key={todo.id}>
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
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${visibleTodos.length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: selectedNav === 'All',
              })}
              onClick={() => setSelectedNav('All')}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: selectedNav === 'Active',
              })}
              onClick={() => setSelectedNav('Active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: selectedNav === 'Completed',
              })}
              onClick={() => setSelectedNav('Completed')}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          {visibleTodos.some(todo => todo.completed === true) && (
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          )}
        </footer>
      </div>

      <Message visibleError={visibleError} setVisibleError={setVisibleError} />
    </div>
  );
};
