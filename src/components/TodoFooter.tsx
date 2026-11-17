import { Filter } from '../types/Filter';
import TodoFilter from './TodoFilter';

type Props = {
  itemsLeft: number;
  completedCount: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export default function TodoFooter({
  itemsLeft,
  filter,
  setFilter,
  completedCount,
}: Props) {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <TodoFilter filter={filter} onFilterChange={setFilter} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
}
