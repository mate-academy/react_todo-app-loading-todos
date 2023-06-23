import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  itemsLeft: Todo[],
  filterType: string,
  handleSelectedType: (event:React.MouseEvent<HTMLAnchorElement>) => void,
};

export const Footer: React.FC<Props> = ({
  itemsLeft,
  filterType,
  handleSelectedType,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === 'all',
          })}
          type="all"
          onClick={handleSelectedType}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === 'active',
          })}
          type="active"
          onClick={handleSelectedType}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === 'completed',
          })}
          type="completed"
          onClick={handleSelectedType}
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
