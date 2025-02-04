import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  filterBy: Filter;
  setFilterBy: React.Dispatch<React.SetStateAction<Filter>>;
  notCompletedTasksCounter: number;
};

export const TodoFooter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  notCompletedTasksCounter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTasksCounter} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(todoType => (
          <a
            href={`#/${todoType}`}
            key={todoType}
            className={classNames('filter__link', {
              selected: todoType === filterBy,
            })}
            data-cy={`FilterLink${todoType}`}
            onClick={() => {
              setFilterBy(todoType);
            }}
          >
            {todoType}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', 'disabled')}
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
