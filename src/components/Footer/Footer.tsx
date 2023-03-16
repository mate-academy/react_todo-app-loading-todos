import classNames from 'classnames';

import { SortType } from '../../types/SortType';

type Props = {
  sortType: SortType,
  activeTodoListLength: number,
  onSetSortType: (sortBy: SortType) => void;
};

export const Footer: React.FC<Props> = ({
  sortType,
  onSetSortType,
  activeTodoListLength,
}) => {
  const handleSortType = (value: SortType) => {
    onSetSortType(value);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodoListLength} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link', { selected: sortType === SortType.ALL },
          )}
          onClick={() => {
            handleSortType(SortType.ALL);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link', { selected: sortType === SortType.ACTIVE },
          )}
          onClick={() => {
            handleSortType(SortType.ACTIVE);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link', { selected: sortType === SortType.COMPLETE },
          )}
          onClick={() => {
            handleSortType(SortType.COMPLETE);
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
