import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import {
  FILTER_FIELD_ACTIVE,
  FILTER_FIELD_ALL,
  FILTER_FIELD_COMPLETED,
} from '../../utils/constants';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, filterField, setFilterField } = useContext(TodoContext);

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filterField === FILTER_FIELD_ALL,
              })}
              data-cy="FilterLinkAll"
              onClick={() => setFilterField(FILTER_FIELD_ALL)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filterField === FILTER_FIELD_ACTIVE,
              })}
              data-cy="FilterLinkActive"
              onClick={() => setFilterField(FILTER_FIELD_ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filterField === FILTER_FIELD_COMPLETED,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilterField(FILTER_FIELD_COMPLETED)}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={todos.every(todo => !todo.completed)}
            style={{
              visibility: todos.every(todo => !todo.completed)
                ? 'hidden'
                : 'visible',
            }}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
