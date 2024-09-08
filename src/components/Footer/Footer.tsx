import cn from 'classnames';
import { State } from '../../types/Todo';

export interface FooterProps {
  activeTasks: number;
  completedTasks: number;
  state: State;
  onStageChange: (stage: State) => void;
}

export const Footer = ({
  activeTasks,
  onStageChange,
  state,
  completedTasks,
}: FooterProps) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTasks} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: state === State.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onStageChange(State.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: state === State.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onStageChange(State.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: state === State.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onStageChange(State.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTasks === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
