import classNames from 'classnames';
import { TodoType } from '../../types/TodoType';

export enum SortType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

type Props = {
  onSortType: (newSortType: SortType) => void;
  selectedSortType: SortType;
  itemsLeft: TodoType[];
};

const sortTypes = [SortType.All, SortType.Active, SortType.Completed];

export const Footer: React.FC<Props> = ({
  onSortType,
  selectedSortType,
  itemsLeft,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft.length} items left`}
      </span>

      <nav className="filter">
        {sortTypes.map(sortType => (
          <a
            key={Math.random()}
            href="#/"
            className={classNames(
              'filter__link',
              { selected: selectedSortType === sortType },
            )}
            onClick={() => onSortType(sortType)}
          >
            {sortType}
          </a>
        ))}
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
