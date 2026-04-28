import classNames from 'classnames';

type Props = {
  todoStatus: boolean | null;
  setTodoStatus: (value: boolean | null) => void;
};

export const Filter = ({ todoStatus, setTodoStatus }: Props) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: todoStatus === null,
        })}
        data-cy="FilterLinkAll"
        onClick={() => setTodoStatus(null)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: todoStatus === false,
        })}
        data-cy="FilterLinkActive"
        onClick={() => setTodoStatus(false)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: todoStatus === true,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setTodoStatus(true)}
      >
        Completed
      </a>
    </nav>
  );
};
