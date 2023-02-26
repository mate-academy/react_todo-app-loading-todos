import classNames from 'classnames';
import { Filter } from '../../enum/Filter';

type Props = {
  filter: Filter,
  setFilter: (value: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link',
          { selected: filter === Filter.ALL })}
        onClick={() => setFilter(Filter.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link',
          { selected: filter === Filter.ACTIVE })}
        onClick={() => setFilter(Filter.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link',
          { selected: filter === Filter.COMPLETED })}
        onClick={() => setFilter(Filter.COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
};
