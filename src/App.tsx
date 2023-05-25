/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 10522;

enum ErorrType {
  NONE,
  ADDERORR,
  DELETEERORR,
  UPDATEERORR,
}

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [erorr, setErorr] = useState<ErorrType>(ErorrType.NONE);
  const [filterTodos, setFilterTodos] = useState(Filter.ALL);
  const [inputValue, setInputValue] = useState('');

  let timeErorr:number;

  const funcVisibleTodos = (arrItems:Todo[], typeFilter:Filter) => {
    const items = [...arrItems];

    return items.filter(item => {
      switch (typeFilter) {
        case Filter.ALL:
          return item;

        case Filter.ACTIVE:
          return item.completed === false;

        case Filter.COMPLETED:
          return item.completed === true;

        default:
          return item;
      }
    });
  };

  const visibleTodos = useMemo(() => funcVisibleTodos(todos, filterTodos),
    [todos, filterTodos]);

  const clearErorr = () => {
    setErorr(ErorrType.NONE);
    window.clearTimeout(timeErorr);
  };

  const funcVisibleErorr = () => {
    timeErorr = window.setTimeout(clearErorr, 3000);
  };

  const qwe = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !inputValue) {
      setErorr(ErorrType.ADDERORR);
    }
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(allTodos => setTodos(allTodos))
      .catch(() => setErorr(ErorrType.UPDATEERORR));
  }, []);

  useEffect(() => {
    funcVisibleErorr();
  }, [erorr]);

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
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => qwe(e)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {visibleTodos.map(todo => (
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

        {todos && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.length} items left`}
            </span>
            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link',
                  { selected: filterTodos === Filter.ALL },
                )}
                onClick={() => setFilterTodos(Filter.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: filterTodos === Filter.ACTIVE },
                )}
                onClick={() => setFilterTodos(Filter.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: filterTodos === Filter.COMPLETED },
                )}
                onClick={() => setFilterTodos(Filter.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        className={classNames(
          'notification is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: erorr === ErorrType.NONE },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => clearErorr()}
        />
        {erorr === ErorrType.ADDERORR && (
          <div>Unable to add a todo</div>
        )}
        {erorr === ErorrType.DELETEERORR && (
          <div>Unable to delete a todo</div>
        )}
        {erorr === ErorrType.UPDATEERORR && (
          <div>Unable to update a todo</div>
        )}
      </div>
    </div>
  );
};
