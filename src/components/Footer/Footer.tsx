import cn from 'classnames';
/* eslint-disable max-len */
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

interface Props {
  clickHandler: (value: Filter) => void
  activeFilter: Filter
  displayTodos: Todo[]
}

export const Footer: React.FC<Props> = ({ clickHandler, activeFilter, displayTodos }) => {
  const amount = displayTodos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${amount} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          onClick={() => clickHandler(Filter.all)}
          href="#/"
          className={
            cn(
              'filter__link', {
                selected: activeFilter === Filter.all,
              },
            )
          }
          data-cy="FilterLinkAll"
        >
          {Filter.all}
        </a>

        <a
          href="#/active"
          className={
            cn(
              'filter__link', {
                selected: activeFilter === Filter.active,
              },
            )
          }
          data-cy="FilterLinkActive"
          onClick={() => clickHandler(Filter.active)}
        >
          {Filter.active}
        </a>

        <a
          href="#/completed"
          className={
            cn(
              'filter__link', {
                selected: activeFilter === Filter.completed,
              },
            )
          }
          data-cy="FilterLinkCompleted"
          onClick={() => clickHandler(Filter.completed)}
        >
          {Filter.completed}
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
