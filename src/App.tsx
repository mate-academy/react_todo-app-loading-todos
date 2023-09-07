/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  StateContext,
} from './components/TodoContext';
import { TodoList } from './components/TodoList';
import { FILTER, ACTIONS } from './utils/enums';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const { state, dispatch } = useContext(StateContext);

  function handleFilter(trigger: string) {
    dispatch({ type: ACTIONS.SORT, payload: trigger });
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </header>

        <TodoList list={state.list} />

        <footer className="todoapp__footer">
          <span className="todo-count">
            {state.totalLength}
            items left
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: state.sortBy === FILTER.ALL,
              })}
              onClick={() => handleFilter(FILTER.ALL)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: state.sortBy === FILTER.ACTIVE,
              })}
              onClick={() => handleFilter(FILTER.ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: state.sortBy === FILTER.COMPLETED,
              })}
              onClick={() => handleFilter(FILTER.COMPLETED)}
            >
              Completed
            </a>
          </nav>

          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {state.error.length > 0 && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button type="button" className="delete" />
          {state.error}
        </div>
      )}
    </div>
  );
};
