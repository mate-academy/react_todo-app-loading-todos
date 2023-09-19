import classNames from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';
import { countTodos } from '../../utils/counterTodos';

type Props = {
  todos: Todo[],
  selectedFilter: string,
  onSelectedFilter: (val: FilterStatus) => void,
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  selectedFilter,
  onSelectedFilter,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countTodos(todos, false)} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterStatus.All,
          })}
          onClick={() => onSelectedFilter(FilterStatus.All)}
        >
          All
        </a>

        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterStatus.Active,
          })}
          onClick={() => onSelectedFilter(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterStatus.Completed,
          })}
          onClick={() => onSelectedFilter(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      {countTodos(todos, true) && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
