import classNames from 'classnames';
import { FilterType } from '../Header/HeaderPropTypes';
import { Props } from './FooterPropTypes';

export const Footer : React.FC<Props> = ({
  countOfItems,
  setFelterType,
  filterType,
  clearCompleted,
  countOfItemsLeft,
  todosLength,
}) => {
  const isAllSelected = todosLength > countOfItemsLeft;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countOfItems} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.All },
          )}
          onClick={() => setFelterType(FilterType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.Active },
          )}
          onClick={() => setFelterType(FilterType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.Completed },
          )}
          onClick={() => setFelterType(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>
      <button
        data-cy="ClearCompletedButton"
        type="button"
        disabled={!isAllSelected}
        className={classNames('todoapp__clear-completed',
          {
            hidden: !isAllSelected,
            visible: isAllSelected,
          })}
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
