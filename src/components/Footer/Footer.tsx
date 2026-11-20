import classNames from 'classnames';
import { Todo } from '../../types/Todo';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NavLink } from 'react-router-dom';

export const Footer = ({ todos }: { todos: Todo[] }) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {todos.filter(todo => !todo.completed).length} items left
    </span>

    <nav className="filter" data-cy="Filter">
      <NavLink
        to="/"
        className={({ isActive }) =>
          classNames('filter__link', { selected: isActive })
        }
        data-cy="FilterLinkAll"
      >
        All
      </NavLink>

      <NavLink
        to="/active"
        className={({ isActive }) =>
          classNames('filter__link', { selected: isActive })
        }
        data-cy="FilterLinkActive"
      >
        Active
      </NavLink>

      <NavLink
        to="/completed"
        className={({ isActive }) =>
          classNames('filter__link', { selected: isActive })
        }
        data-cy="FilterLinkCompleted"
      >
        Completed
      </NavLink>
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={todos.filter(todo => todo.completed).length === 0}
    >
      Clear completed
    </button>
  </footer>
);
