import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/TodosFilter';

interface Props {
  todos: Todo[];
  filter: string;
  onSetFilter: (filter: FilterBy) => void;
}

export const Footer: React.FC<Props> = ({ todos, filter, onSetFilter }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FilterBy.ALL,
          })}
          onClick={() => onSetFilter(FilterBy.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FilterBy.ACTIVE,
          })}
          onClick={() => onSetFilter(FilterBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FilterBy.COMPLETED,
          })}
          onClick={() => onSetFilter(FilterBy.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
