import { FilterBy } from '../../types/FilterBy';
import { TodosFilter } from '../TodosFilter/TodosFiter';

type Props = {
  numberOfNotCompleted: number;
  filteredBy: FilterBy;
  setFilteredBy: (filterBy: FilterBy) => void;
  handleClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  numberOfNotCompleted,
  filteredBy,
  setFilteredBy,
  handleClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${numberOfNotCompleted} item${numberOfNotCompleted !== 1 ? 's' : ''} left`}
      </span>

      <TodosFilter
        filteredBy={filteredBy}
        setFilteredBy={setFilteredBy}
      />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
