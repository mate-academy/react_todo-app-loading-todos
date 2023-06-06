import classNames from 'classnames';

interface FilterProps {
  currentFilter: string;
  onSelectFilter: (filterType: string) => void;
}

export const Filter: React.FC<FilterProps> = ({
  currentFilter,
  onSelectFilter,
}) => {
  const filterTypes = ['all', 'active', 'completed'];

  const handleSelectFilter = (filterType: string) => {
    if (currentFilter !== filterType && filterTypes.includes(filterType)) {
      onSelectFilter(filterType);
    }
  };

  return (
    <nav className="filter">
      {filterTypes.map((filter) => {
        let title: string | string[] = filter.split('');

        title[0] = title[0].toUpperCase();

        title = title.join('');

        return (
          <a
            key={filter}
            href={filter === 'all' ? '#/' : `#/${filter}`}
            className={classNames('filter__link',
              { selected: currentFilter === 'all' })}
            onClick={() => handleSelectFilter(filter)}
          >
            {title}
          </a>
        );
      })}
    </nav>
  );
};
