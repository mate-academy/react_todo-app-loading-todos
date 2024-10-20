import { ClearCompletedButton } from '../../components/ClearCompletedButton';
import { Filter } from '../../components/Filter';
import { Filters } from '../../types/Filters';

type Props = {
  uncompletedCount: number;
  currentFilter: Filters;
  onFilterChange: (filter: Filters) => void;
};

export const Footer: React.FC<Props> = ({
  uncompletedCount,
  currentFilter,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <Filter currentFilter={currentFilter} onFilterChange={onFilterChange} />

      {/* this button should be disabled if there are no completed todos */}
      {uncompletedCount > 0 && <ClearCompletedButton />}
    </footer>
  );
};
