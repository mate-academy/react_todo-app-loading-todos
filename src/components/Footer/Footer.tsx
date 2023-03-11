import classNames from 'classnames';
import { TodoType } from '../../types/TodoType';

export enum SortType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const sortTypes = [
  { id: 1, type: SortType.All },
  { id: 2, type: SortType.Active },
  { id: 3, type: SortType.Completed },
];

type Props = {
  onSortType: (newSortType: SortType) => void;
  selectedSortType: SortType;
  itemsLeft: TodoType[];
};

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
          <li key={sortType.id} style={{ listStyle: 'none' }}>
            <a
              href="#/"
              className={classNames(
                'filter__link',
                { selected: selectedSortType === sortType.type },
              )}
              onClick={() => onSortType(sortType.type)}
            >
              {sortType.type}
            </a>
          </li>
        ))}
      </nav>
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
