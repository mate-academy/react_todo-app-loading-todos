import cn from 'classnames';
import { FilterStatus, Todo } from '../../types';

export type Props = {
  todos: Todo[];
  quantityTasksActive: number;
  activeFilterStatus: string;
  handleOnChangeFilter: (type: FilterStatus) => void;
  handleOnDeleteAllTodos: () => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  quantityTasksActive,
  activeFilterStatus,
  handleOnChangeFilter,
  handleOnDeleteAllTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${quantityTasksActive} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: activeFilterStatus === FilterStatus.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleOnChangeFilter(FilterStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: activeFilterStatus === FilterStatus.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleOnChangeFilter(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: activeFilterStatus === FilterStatus.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleOnChangeFilter(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={quantityTasksActive === todos.length}
        onClick={() => handleOnDeleteAllTodos()}
      >
        Clear completed
      </button>
    </footer>
  );
};
