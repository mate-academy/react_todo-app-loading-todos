import { Filter } from '../../types/Filter';
import { TodoFilter } from '../TodoFilter/TodoFilter';

type Props = {
  filterStatus: Filter;
  activeTodosCount: number;
  onFilterChange: (status: Filter) => void;
};

export const Footer: React.FC<Props> = ({
  filterStatus,
  activeTodosCount,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <TodoFilter status={filterStatus} onChange={onFilterChange} />
    </footer>
  );
};
