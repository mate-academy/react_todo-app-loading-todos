import { FilterType } from '../App';
import { Filter } from './Filter';

type Props = {
  notCompletedCount: number;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

export const Footer: React.FC<Props> = ({
  notCompletedCount,
  filter,
  setFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <Filter filter={filter} setFilter={setFilter} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
