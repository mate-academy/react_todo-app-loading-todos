import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  onChangeStatus: (filterStatus: Filter) => void;
  status: Filter;
  todosCount: number;
};

export const TodosFilter: React.FC<Props> = ({
  onChangeStatus,
  status,
  todosCount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={
            classNames('filter__link', { selected: status === Filter.all })
          }
          onClick={() => onChangeStatus(Filter.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            classNames('filter__link', { selected: status === Filter.active })
          }
          onClick={() => onChangeStatus(Filter.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            classNames(
              'filter__link',
              { selected: status === Filter.completed },
            )
          }
          onClick={() => onChangeStatus(Filter.completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
