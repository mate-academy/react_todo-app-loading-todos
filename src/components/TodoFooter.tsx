import { Filter } from '../types/Filter';
import TodoFilter from './TodoFilter';

type Props = {
  itemsLeft: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export default function TodoFooter({ itemsLeft, filter, setFilter }: Props) {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <TodoFilter filter={filter} setFilter={setFilter} />

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
}
