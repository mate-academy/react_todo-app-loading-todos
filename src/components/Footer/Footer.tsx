import { FunctionComponent } from 'react';
import classnames from 'classnames';
import { FilterType } from '../../types/filterType';
import { Todo } from '../../types/Todo';

interface FooterProps {
  todos: Todo[];
  filterBy: number
  setFilterBy: (filter: number) => void;
}
export const Footer: FunctionComponent<FooterProps> = ({
  todos,
  filterBy,
  setFilterBy,
}) => {
  const notCompletedTodo = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodo.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classnames('filter__link', {
            selected: filterBy === FilterType.All,
          })}
          onClick={() => setFilterBy(FilterType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classnames('filter__link', {
            selected: filterBy === FilterType.Active,
          })}
          onClick={() => setFilterBy(FilterType.Active)}
        >
          Active
        </a>

        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classnames('filter__link', {
            selected: filterBy === FilterType.Completed,
          })}
          onClick={() => setFilterBy(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
