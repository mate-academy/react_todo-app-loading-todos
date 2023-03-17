import { FC, useState } from 'react';
import classNames from 'classnames';
import { FilterStatus } from '../../types/filterStatus';

type Props = {
  mountComplitedTodos: number,
  filterTodos: (value: string) => void,
};

const Footer: FC<Props> = ({
  mountComplitedTodos: compitedTodos,
  filterTodos,
}) => {
  const [activeLink, setActiveLink] = useState<string>(FilterStatus.All);

  const hendlerLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    const { select } = e.currentTarget.dataset;

    setActiveLink(select || FilterStatus.All);
    if (select) {
      filterTodos(select);
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {compitedTodos}
        {' items left'}
      </span>

      <nav className="filter">
        <a
          href="#/"
          data-select={FilterStatus.All}
          className={classNames(
            'filter__link',
            { selected: activeLink === FilterStatus.All },
          )}
          onClick={hendlerLink}
        >
          All
        </a>

        <a
          href="#/active"
          data-select={FilterStatus.Active}
          className={classNames(
            'filter__link',
            { selected: activeLink === FilterStatus.Active },
          )}
          onClick={hendlerLink}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-select={FilterStatus.Completed}
          className={classNames(
            'filter__link',
            { selected: activeLink === FilterStatus.Completed },
          )}
          onClick={hendlerLink}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
