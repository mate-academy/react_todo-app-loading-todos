import { Todo } from './types/Todo';
import { Status } from './enums/status';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  isAnyCompleted: boolean;
};

export const Footer = ({ todos, isAnyCompleted }: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {/* {Object.values(Status).map(status => {
          <a
            key={status}
            href="#/"
            className="filter__link selected"
            data-cy="FilterLinkAll"
          >
            {status}
          </a>;
        })} */}
        {/* <a href="#/" className="filter__link selected" data-cy="FilterLinkAll">
          All
        </a>

        <a href="#/active" className="filter__link" data-cy="FilterLinkActive">
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a> */}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isAnyCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
