import { Status } from '../types/Status';
import classNames from 'classnames';

type Props = {
  length: number;
  status: Status;
  setStatus: (value: Status) => void;
};

export const Footer: React.FC<Props> = ({ length, status, setStatus }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(value => (
          <a
            key={value}
            href={
              value === Status.All
                ? '#/'
                : value === Status.Active
                  ? '#/active'
                  : '#/completed'
            }
            data-cy={
              value === Status.All
                ? 'FilterLinkAll'
                : value === Status.Active
                  ? 'FilterLinkActive'
                  : 'FilterLinkCompleted'
            }
            className={classNames([
              'filter__link',
              {
                selected: status === value,
              },
            ])}
            onClick={event => {
              event.preventDefault();

              setStatus(value);
            }}
          >
            {value}
          </a>
        ))}
        {/* <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a> */}
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
