import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TaskStatus } from '../../types/Sort';

interface FilterProps {
  todos: Todo[];
  sortType: TaskStatus;
  onChangeSortType: (sortType: TaskStatus) => void;
}

export const Filter: FC<FilterProps> = ({
  todos,
  sortType,
  onChangeSortType,
}) => {
  const active = todos.filter(todo => !todo.completed);
  const completed = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${active.length} items left`}
      </span>

      <nav className="filter">
        <a
          href={`#/${TaskStatus.ALL}`}
          className={classNames('filter__link', {
            selected: sortType === TaskStatus.ALL,
          })}
          onClick={() => onChangeSortType(TaskStatus.ALL)}
        >
          All
        </a>

        <a
          href={`#/${TaskStatus.ACTIVE}`}
          className={classNames('filter__link', {
            selected: sortType === TaskStatus.ACTIVE,
          })}
          onClick={() => onChangeSortType(TaskStatus.ACTIVE)}
        >
          Active
        </a>

        <a
          href={`#/${TaskStatus.COMPLETED}`}
          className={classNames('filter__link', {
            selected: sortType === TaskStatus.COMPLETED,
          })}
          onClick={() => onChangeSortType(TaskStatus.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {completed.length > 0
      && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
