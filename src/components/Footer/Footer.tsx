import { Filter } from '../../types/Filter';
import { TodoFilter } from '../TodoFilter/TodoFilter';

interface Props {
  onFilterChange: (filter: Filter) => void;
  selectedFilter: Filter;
  activeTodosCount: number;
}

export const Footer: React.FC<Props> = ({
  onFilterChange,
  selectedFilter,
  activeTodosCount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <TodoFilter
        onFilterChange={onFilterChange}
        selectedFilter={selectedFilter}
      />
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
