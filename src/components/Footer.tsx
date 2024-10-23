import classNames from 'classnames';
import { useState } from 'react';

interface Props {
  onFilter: (value: string) => void;
}

export const Footer: React.FC<Props> = ({ onFilter }) => {
  const [activeLink, setActiveLink] = useState('all');

  const handleFiltering = (filterType: string) => {
    onFilter(filterType);
    setActiveLink(filterType);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          onClick={() => handleFiltering('all')}
          className={classNames(
            'filter__link',
            activeLink === 'all' && 'selected',
          )}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => handleFiltering('active')}
          className={classNames(
            'filter__link',
            activeLink === 'active' && 'selected',
          )}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          onClick={() => handleFiltering('completed')}
          className={classNames(
            'filter__link',
            activeLink === 'completed' && 'selected',
          )}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
