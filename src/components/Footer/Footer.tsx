import classNames from 'classnames';
import { Props } from './FooterPropTypes';

export const Footer : React.FC<Props> = ({
  countOfItems,
  setFelterType,
  filterType,
  clearCompleted,
}) => {
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
            { selected: filterType === 'All' },
          )}
          onClick={() => setFelterType('All')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterType === 'Active' },
          )}
          onClick={() => setFelterType('Active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterType === 'Completed' },
          )}
          onClick={() => setFelterType('Completed')}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
