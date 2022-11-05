import classNames from 'classnames';
import { useContext, useState } from 'react';
import { SortParam } from '../../types/SortParam';
import { NavContext } from '../NavContext';
// import { NavContext } from '../NavContext';

// type Props = {
//   setSortBy: React.Dispatch<React.SetStateAction<SortParam>>,
// };

export const Nav: React.FC/* <Props> */ = (/* { setSortBy } */) => {
  const [activeButton, setActiveButton] = useState('all');
  // const [sortBy, setSortBy] = useState(SortParam.All);
  const { setSortBy } = useContext(NavContext);
  // console.log(sortBy)

  function selectSort(param: string | undefined) {
    switch (param) {
      case 'FilterLinkAll':
        setSortBy(SortParam.All);
        setActiveButton('all');
        break;

      case 'FilterLinkActive':
        setSortBy(SortParam.Active);
        setActiveButton('active');
        break;

      case 'FilterLinkCompleted':
        setSortBy(SortParam.Completed);
        setActiveButton('completed');
        break;

      default:
        break;
    }
  }

  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames('filter__link',
          {
            selected: activeButton === 'all',
          })}
        onClick={(event) => selectSort(event.currentTarget.dataset.cy)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames('filter__link',
          {
            selected: activeButton === 'active',
          })}
        onClick={(event) => selectSort(event.currentTarget.dataset.cy)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames('filter__link',
          {
            selected: activeButton === 'completed',
          })}
        onClick={(event) => selectSort(event.currentTarget.dataset.cy)}
      >
        Completed
      </a>
    </nav>
  );
};
