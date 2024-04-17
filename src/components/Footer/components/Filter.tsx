import { Filter } from '../../../types/Filter';
import { FilterItem } from './FilterItem';

export const FilterContainer: React.FC = () => {
  return (
    <nav className="filter" data-cy="Filter">
      <FilterItem value={Filter.all} />
      <FilterItem value={Filter.active} />
      <FilterItem value={Filter.completed} />
    </nav>
  );
};
