import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  setSortBy: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ setSortBy }) => {
  const [selectedTab, setSelectedTab] = useState('all');

  return (
    <>
      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link',
            { 'filter__link selected': selectedTab === 'all' })}
          onClick={() => {
            setSortBy('all');
            setSelectedTab('all');
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link',
            { 'filter__link selected': selectedTab === 'Active' })}
          onClick={() => {
            setSortBy('Active');
            setSelectedTab('Active');
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link',
            { 'filter__link selected': selectedTab === 'Completed' })}
          onClick={() => {
            setSortBy('Completed');
            setSelectedTab('Completed');
          }}
        >
          Completed
        </a>
      </nav>
      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </>
  );
};
