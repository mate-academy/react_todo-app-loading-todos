import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/enum';

type Props = {
  todos: Todo[] | null,
  filterBy: string,
  onFilterBy: (filterType: string) => void,
};

export const TodoFooter:React.FC<Props> = ({
  todos,
  filterBy,
  onFilterBy,
}) => {
  const completedTodos = todos?.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos?.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === FilterType.All,
          })}
          onClick={() => onFilterBy(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterBy === FilterType.Active,
          })}
          onClick={() => onFilterBy(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterBy === FilterType.Completed,
          })}
          onClick={() => onFilterBy(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      {completedTodos?.length !== 0 && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
