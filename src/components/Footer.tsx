import { FC } from 'react';
import classNames from 'classnames';
import { FilterStatusEnum } from '../types/Status.enum';

interface Props {
  activeTodosCount: number;
  filterStatus: FilterStatusEnum;
  onStatusChange: (status: FilterStatusEnum) => void;
}

export const Footer: FC<Props> = ({
  activeTodosCount,
  filterStatus,
  onStatusChange,
}) => {
  return (
    /* Hide the footer if there are no todos */
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the selected class **/}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={classNames('filter__link', {
            selected: filterStatus === FilterStatusEnum.All,
          })}
          onClick={() => onStatusChange(FilterStatusEnum.All)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={classNames('filter__link', {
            selected: filterStatus === FilterStatusEnum.Active,
          })}
          onClick={() => onStatusChange(FilterStatusEnum.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={classNames('filter__link', {
            selected: filterStatus === FilterStatusEnum.Completed,
          })}
          onClick={() => onStatusChange(FilterStatusEnum.Completed)}
        >
          Completed
        </a>
      </nav>
      {/* this button should be disabled if there are no completed todos */}
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
