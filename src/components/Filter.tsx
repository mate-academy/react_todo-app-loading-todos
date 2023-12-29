import classNames from 'classnames';
import { FC } from 'react';
import { useTodo } from '../providers/TodoProvider';
import { FilterType } from '../types/FilterType';

type Props = {
  filter: FilterType;
};

export const Filter: FC<Props> = ({ filter }) => {
  const { setActiveFilter, activeFilter } = useTodo();

  const handleClick = (selectedFilter: FilterType) => () => {
    setActiveFilter(selectedFilter);
  };

  return (
    <a
      href="#/completed"
      className={classNames('filter__link', {
        selected: activeFilter === filter,
      })}
      data-cy="FilterLinkCompleted"
      onClick={handleClick(filter)}
    >
      {filter}
    </a>
  );
};
