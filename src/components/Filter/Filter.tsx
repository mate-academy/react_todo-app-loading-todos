import classNames from 'classnames';

type Props = {
  filter: string,
  onSetFilter: (filter: string) => void,
};

export const Filter: React.FC<Props> = ({ filter, onSetFilter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames('filter__link',
          {
            selected: filter === 'All',
          })}
        onClick={() => onSetFilter('All')}
      >
        All
      </a>
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames('filter__link',
          {
            selected: filter === 'Active',
          })}
        onClick={() => onSetFilter('Active')}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames('filter__link',
          {
            selected: filter === 'Complited',
          })}
        onClick={() => onSetFilter('Complited')}
      >
        Complited
      </a>
    </nav>
  );
};
