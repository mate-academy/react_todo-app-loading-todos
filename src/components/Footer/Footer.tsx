import classNames from 'classnames';
import { FilterType } from '../../types/FilterType';

type Props = {
  itemsLeft: number,
  filterType: FilterType,
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>,
};

export const Footer: React.FC<Props> = ({
  itemsLeft,
  filterType,
  setFilterType,
}) => {
  const handleClickAll = () => {
    setFilterType(FilterType.ALL);
  };

  const handleClickActive = () => {
    setFilterType(FilterType.ACTIVE);
  };

  const handleClickCompleted = () => {
    setFilterType(FilterType.COMPLETED);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === FilterType.ALL,
          })}
          onClick={handleClickAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === FilterType.ACTIVE,
          })}
          onClick={handleClickActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === FilterType.COMPLETED,
          })}
          onClick={handleClickCompleted}
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
