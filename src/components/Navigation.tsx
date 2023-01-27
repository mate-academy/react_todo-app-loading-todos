import React from 'react';

type Props = {
  changeFunction: (event: React.MouseEvent) => void
};

export const Navigation: React.FC<Props> = ({ changeFunction }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className="filter__link selected"
        onClick={(event) => changeFunction(event)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className="filter__link"
        onClick={(event) => changeFunction(event)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className="filter__link"
        onClick={(event) => changeFunction(event)}
      >
        Completed
      </a>

    </nav>
  );
};
