import classNames from 'classnames';
import { Filter } from '../../../types/Filter';
import { Todo } from '../../../types/Todo';

type Props = {
  todos: Todo[];
  filter: Filter,
  onSetFilter: (filter: Filter) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  onSetFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link',
            { selected: filter === Filter.ALL })}
          onClick={() => onSetFilter(Filter.ALL)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link',
            { selected: filter === Filter.Active })}
          onClick={() => onSetFilter(Filter.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link',
            { selected: filter === Filter.Completed })}
          onClick={() => onSetFilter(Filter.Completed)}
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
