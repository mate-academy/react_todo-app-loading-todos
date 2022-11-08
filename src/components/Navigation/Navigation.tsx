import classNames from 'classnames';
import { GroupBy } from '../../types/GroupBy';

type Props = {
  groupBy: GroupBy,
  setGroupBy: (status: GroupBy) => void;
};

export const Navigation: React.FC<Props> = ({ groupBy, setGroupBy }) => (
  <nav className="filter" data-cy="Filter">
    <a
      data-cy="FilterLinkAll"
      href="#/"
      className={classNames('filter__link', {
        selected: groupBy === GroupBy.ALL,
      })}
      onClick={() => setGroupBy(GroupBy.ALL)}
    >
      All
    </a>

    <a
      data-cy="FilterLinkActive"
      href="#/active"
      className={classNames('filter__link', {
        selected: groupBy === GroupBy.ACTIVE,
      })}
      onClick={() => setGroupBy(GroupBy.ACTIVE)}
    >
      Active
    </a>
    <a
      data-cy="FilterLinkCompleted"
      href="#/completed"
      className={classNames('filter__link', {
        selected: groupBy === GroupBy.COMPLETED,
      })}
      onClick={() => setGroupBy(GroupBy.COMPLETED)}
    >
      Completed
    </a>
  </nav>
);
