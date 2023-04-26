import classNames from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  filterType: Status,
  setFilterType: (value: Status) => void,
};

export const Footer: React.FC<Props> = ({ filterType, setFilterType }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link',
            { selected: filterType === Status.All })}
          onClick={() => setFilterType(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: filterType === Status.Active })}
          onClick={() => setFilterType(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: filterType === Status.Completed })}
          onClick={() => setFilterType(Status.Completed)}
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
