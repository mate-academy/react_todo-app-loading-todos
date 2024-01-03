import { Dispatch, SetStateAction } from 'react';
import { TasksFilter } from '../types/tasksFilter';

interface Props {
  tasksFilter: TasksFilter,
  setTasksFilter: Dispatch<SetStateAction<TasksFilter>>
}

export const Footer: React.FC<Props> = ({
  tasksFilter,
  setTasksFilter,
}) => {
  const handleAll = () => {
    setTasksFilter(TasksFilter.all);
  };

  const handleActive = () => {
    setTasksFilter(TasksFilter.active);
  };

  const handleCompleted = () => {
    setTasksFilter(TasksFilter.completed);
  };

  return (
    <footer
      className="todoapp__footer"
      data-cy="Footer"
    >
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${tasksFilter === 'all' && 'selected'}`}
          data-cy="FilterLinkAll"
          onClick={handleAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${tasksFilter === 'active' && 'selected'}`}
          data-cy="FilterLinkActive"
          onClick={handleActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${tasksFilter === 'completed' && 'selected'}`}
          data-cy="FilterLinkCompleted"
          onClick={handleCompleted}
        >
          Completed
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
