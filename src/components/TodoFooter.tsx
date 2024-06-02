import { useContext } from 'react';
import { CreatedContext } from './TodoContext';
import { FilterButtons } from '../types/FilterType';
import React from 'react';
import classNames from 'classnames';

export const TodoFooter = () => {
  const { state, dispatch } = useContext(CreatedContext);
  const { todos } = state;
  const onlyActiveTodos = todos.filter(todo => !todo.completed);

  const handleCounter =
    todos.length === 1 ? '1 item left' : `${onlyActiveTodos.length} items left`;

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <>
            <span className="todo-count" data-cy="TodosCounter">
              {handleCounter}
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link selected', {
                  selected: FilterButtons.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  dispatch({
                    type: 'SET_FILTER',
                    filterName: FilterButtons.All,
                  });
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: FilterButtons.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  dispatch({
                    type: 'SET_FILTER',
                    filterName: FilterButtons.Active,
                  });
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: FilterButtons.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  dispatch({
                    type: 'SET_FILTER',
                    filterName: FilterButtons.Completed,
                  });
                }}
              >
                Completed
              </a>
            </nav>
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => {
                dispatch({
                  type: 'CLEAR_ALL_COMPLETED',
                });
              }}
              disabled={todos.length === onlyActiveTodos.length}
            >
              Clear completed
            </button>
          </>
        </footer>
      )}
    </>
  );
};
