import React from 'react';

type Props = {
  onAll: () => void,
  onActive: () => void,
  onCompleted: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  onActive,
  onCompleted,
  onAll,
}) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className="filter__link selected"
        onClick={() => onAll()}
      >
        All
      </a>

      <a
        href="#/active"
        className="filter__link"
        onClick={() => onActive()}
      >
        Active
      </a>

      <a
        href="#/completed"
        className="filter__link"
        onClick={() => onCompleted()}
      >
        Completed
      </a>
    </nav>
  );
};
