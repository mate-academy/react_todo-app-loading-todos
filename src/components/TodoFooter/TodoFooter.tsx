import cn from 'classnames';
import { FilterStatus } from '../../types/FilterStatus';
import { getCompletedTodos } from '../../services/todo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filterStatus: FilterStatus,
  onFilterStatus: (filterStatus: FilterStatus) => void,
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  filterStatus,
  onFilterStatus,
}) => {
  const completedTodosCount = getCompletedTodos(todos).length;
  const activeTodosCount = todos.length - completedTodosCount;

  const handleFilterChanging = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    newStatus: FilterStatus,
  ) => {
    event.preventDefault();

    if (newStatus !== filterStatus) {
      onFilterStatus(newStatus);
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: filterStatus === FilterStatus.All },
          )}
          onClick={(event) => (
            handleFilterChanging(event, FilterStatus.All)
          )}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            { selected: filterStatus === FilterStatus.Active },
          )}
          onClick={(event) => (
            handleFilterChanging(event, FilterStatus.Active)
          )}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: filterStatus === FilterStatus.Completed },
          )}
          onClick={(event) => (
            handleFilterChanging(event, FilterStatus.Completed)
          )}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={cn(
          'todoapp__clear-completed',
          { hidden: !completedTodosCount },
        )}
      >
        Clear completed
      </button>
    </footer>
  );
};
