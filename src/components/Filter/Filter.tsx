import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  setFilterParamHandler: (param: string) => void
};

export const Filter: React.FC<Props> = ({ setFilterParamHandler }) => {
  const [activeLink, setActiveLink] = useState({
    all: true,
    completed: false,
    active: false,
  });

  const filterHandler = (event:React.MouseEvent<HTMLAnchorElement>) => {
    const { innerText } = event.currentTarget;

    switch (true) {
      case innerText === 'Active':
        setFilterParamHandler('active');
        setActiveLink({
          all: false,
          completed: false,
          active: true,
        });
        break;

      case innerText === 'All':
        setFilterParamHandler('all');
        setActiveLink({
          all: true,
          completed: false,
          active: false,
        });
        break;

      case innerText === 'Completed':
        setFilterParamHandler('completed');
        setActiveLink({
          all: false,
          completed: true,
          active: false,
        });
        break;

      default:
    }
  };

  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames(
          'filter__link',
          { selected: activeLink.all },
        )}
        onClick={filterHandler}

      >
        All
      </a>

      <a
        href="#/active"
        className={classNames(
          'filter__link',
          { selected: activeLink.active },
        )}
        onClick={filterHandler}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames(
          'filter__link',
          { selected: activeLink.completed },
        )}
        onClick={filterHandler}
      >
        Completed
      </a>
    </nav>
  );
};
