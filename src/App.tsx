/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';
import { Error } from './types/Error';

const USER_ID = 6335;

export const App: React.FC = () => {
  const [allTodos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isErrorHidden, setIsErrorHidden] = useState(true);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setIsError(Error.Load);
        setIsErrorHidden(false);
        setTimeout(() => setIsErrorHidden(true), 3000);
      });
  }, []);

  const filterHandler = (array: Todo[], filterType: string) => {
    switch (filterType) {
      case Filter.Active:
        return array.filter(item => !item.completed);
      case Filter.Completed:
        return array.filter(item => item.completed);
      default:
        return array;
    }
  };

  const activeTodos = allTodos.filter(todo => !todo.completed);
  const completedTodos = filterHandler(allTodos, Filter.Completed);
  const visibleTodos = filterHandler(allTodos, filter);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames(
              'todoapp__toggle-all', { active: activeTodos.length === 0 },
            )}
            style={{ opacity: allTodos.length === 0 ? 0 : 1 }}

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

        <section className="todoapp__main">
          {visibleTodos.map(todo => (
            <div
              key={todo.id}
              className={classNames('todo', { completed: todo.completed })}
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

        {allTodos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos.length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link', { selected: filter === Filter.All },
                )}
                onClick={() => setFilter(Filter.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link', { selected: filter === Filter.Active },
                )}
                onClick={() => setFilter(Filter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link', { selected: filter === Filter.Completed },
                )}
                onClick={() => setFilter(Filter.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              style={{ opacity: completedTodos.length === 0 ? 0 : 1 }}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {isError && (
        <div className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: isErrorHidden },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setIsErrorHidden(true)}
          />

          {isError === Error.Load && 'Unable to load todos'}
          <br />
          {isError === Error.Add && 'Unable to add a todo'}
          <br />
          {isError === Error.Delete && 'Unable to delete a todo'}
          <br />
          {isError === Error.Update && 'Unable to update a todo'}
        </div>
      )}
    </div>
  );
};
