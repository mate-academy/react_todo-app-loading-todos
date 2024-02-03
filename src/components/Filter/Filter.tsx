/* eslint-disable import/no-cycle */
/* eslint-disable quote-props */
import { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../TodosContext/TodosContext';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

interface FilterProps {
  onChangeStatus: (newStatus: Status) => void;
  status: Status
}

export const Filter: React.FC<FilterProps> = ({ onChangeStatus, status }) => {
  const { todos } = useContext(TodosContext);
  const handleStatusChange = (newStatus: Status) => {
    onChangeStatus(newStatus);
  };

  const itemsLeft = todos.reduce((left: number, value: Todo) => {
    let result = left;

    if (!value.completed) {
      result += 1;
    }

    return result;
  }, 0);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${itemsLeft} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames({
            'filter__link selected': status === Status.All,
            'filter__link': status !== Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleStatusChange(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames({
            'filter__link selected': status === Status.Active,
            'filter__link': status !== Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleStatusChange(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames({
            'filter__link selected': status === Status.Completed,
            'filter__link': status !== Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleStatusChange(Status.Completed)}
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
